import http from "http";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

// Dynamically import puppeteer from storefront node_modules
const puppeteerPath = "/home/ateeb/projects/yasmeen-sons/storefront/node_modules/puppeteer";
const puppeteer = (await import(`${puppeteerPath}/lib/puppeteer/puppeteer.js`)).default;

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOTS_DIR = "/home/ateeb/projects/tax-yasmeensons/scripts/audit_screenshots";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Start Next.js standalone server
console.log(`Starting next server on port ${PORT}...`);
const serverProc = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: "/home/ateeb/projects/tax-yasmeensons",
  stdio: "pipe",
  env: { ...process.env, PORT: String(PORT) },
});

serverProc.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
serverProc.stderr.on("data", (d) => process.stderr.write(`[next:err] ${d}`));

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) resolve(true);
          else reject(new Error(`Status: ${res.statusCode}`));
        });
        req.on("error", reject);
        req.end();
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("Server failed to start within timeout");
}

async function runAudit() {
  await waitForServer(BASE_URL);
  console.log("Server is ready. Launching Puppeteer with local Google Chrome...");

  const browser = await puppeteer.launch({
    executablePath: "/home/ateeb/.local/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    headless: true,
  });

  const routes = [
    { name: "home", path: "/" },
    { name: "start", path: "/start" },
    { name: "services", path: "/services" },
    { name: "pricing", path: "/pricing" },
    { name: "requirements", path: "/requirements" },
    { name: "iris-guide", path: "/iris-guide" },
    { name: "salaried", path: "/salaried" },
  ];

  const viewports = [
    { name: "mobile", width: 390, height: 844, isMobile: true },
    { name: "desktop", width: 1440, height: 900, isMobile: false },
  ];

  const results = [];

  for (const vp of viewports) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
      
      const fullUrl = `${BASE_URL}${route.path}`;
      await page.goto(fullUrl, { waitUntil: "networkidle2" });

      // Check overflow
      const overflowMetrics = await page.evaluate(() => {
        const docWidth = document.documentElement.offsetWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const hasHorizontalOverflow = scrollWidth > innerWidth;

        // Find overflowing elements
        const badElements = [];
        const all = document.querySelectorAll("*");
        all.forEach((el) => {
          if (el.scrollWidth > innerWidth + 1) {
            badElements.push({
              tag: el.tagName,
              className: el.className ? String(el.className).slice(0, 80) : "",
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth,
            });
          }
        });

        return {
          docWidth,
          scrollWidth,
          innerWidth,
          hasHorizontalOverflow,
          badElementsCount: badElements.length,
          badElements: badElements.slice(0, 3),
        };
      });

      const screenshotFile = path.join(SCREENSHOTS_DIR, `${vp.name}_${route.name}.png`);
      await page.screenshot({ path: screenshotFile, fullPage: false });

      results.push({
        viewport: vp.name,
        route: route.path,
        hasOverflow: overflowMetrics.hasHorizontalOverflow,
        scrollWidth: overflowMetrics.scrollWidth,
        innerWidth: overflowMetrics.innerWidth,
        badElements: overflowMetrics.badElements,
      });

      await page.close();
    }
  }

  // Also test AppClip interaction on mobile
  console.log("Testing AppClip bottom-sheet opening on mobile...");
  const clipPage = await browser.newPage();
  await clipPage.setViewport({ width: 390, height: 844, isMobile: true });
  await clipPage.goto(BASE_URL, { waitUntil: "networkidle2" });

  // Click on the Fast AppClip Intake button in Hero or Tab Bar
  const buttonClicked = await clipPage.evaluate(() => {
    // Find button with text containing Fast AppClip Intake or Sparkles icon
    const btns = Array.from(document.querySelectorAll("button"));
    const intakeBtn = btns.find((b) => b.innerText.includes("Fast AppClip Intake"));
    if (intakeBtn) {
      intakeBtn.click();
      return true;
    }
    return false;
  });

  if (buttonClicked) {
    await new Promise((r) => setTimeout(r, 800)); // wait for framer-motion slide up
    const clipSheetOverflow = await clipPage.evaluate(() => {
      const sheet = document.querySelector('[role="dialog"]') || document.querySelector('.z-50');
      return {
        sheetPresent: !!sheet,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      };
    });

    const clipScreenshot = path.join(SCREENSHOTS_DIR, "mobile_appclip_open.png");
    await clipPage.screenshot({ path: clipScreenshot });

    results.push({
      viewport: "mobile-clip-interaction",
      route: "AppClipSheet (tax-intake)",
      sheetPresent: clipSheetOverflow.sheetPresent,
      hasOverflow: clipSheetOverflow.scrollWidth > clipSheetOverflow.innerWidth,
    });
  }

  await clipPage.close();
  await browser.close();
  serverProc.kill("SIGINT");

  console.log("\n=== AUDIT RESULTS ===");
  console.log(JSON.stringify(results, null, 2));

  const anyFailed = results.some((r) => r.hasOverflow);
  if (anyFailed) {
    console.error("FAIL: Horizontal bleeding/overflow detected!");
    process.exit(1);
  } else {
    console.log("SUCCESS: All viewports pass zero-bleeding check!");
    process.exit(0);
  }
}

runAudit().catch((err) => {
  console.error("Audit error:", err);
  serverProc.kill("SIGINT");
  process.exit(1);
});
