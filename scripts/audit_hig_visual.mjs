import http from "http";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const puppeteerPath = "/home/ateeb/projects/yasmeen-sons/storefront/node_modules/puppeteer";
const puppeteer = (await import(`${puppeteerPath}/lib/puppeteer/puppeteer.js`)).default;

const PORT = 3012;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOTS_DIR = "/home/ateeb/projects/tax-yasmeensons/scripts/audit_screenshots";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

console.log(`Starting next standalone server on port ${PORT}...`);
const serverProc = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: "/home/ateeb/projects/tax-yasmeensons",
  stdio: "pipe",
  env: { ...process.env, PORT: String(PORT) },
});

serverProc.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
serverProc.stderr.on("data", (d) => process.stderr.write(`[next:err] ${d}`));

async function waitForServer(url, timeoutMs = 25000) {
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

async function runVisualAudit() {
  await waitForServer(BASE_URL);
  console.log("Server ready. Launching Puppeteer...");

  const browser = await puppeteer.launch({
    executablePath: "/home/ateeb/.local/bin/google-chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    headless: true,
  });

  const modes = ["light", "dark"];
  const viewports = [
    { name: "mobile", width: 390, height: 844, isMobile: true },
    { name: "desktop", width: 1440, height: 900, isMobile: false },
  ];

  for (const mode of modes) {
    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });

      // Pre-set theme in localStorage so <head> anti-flicker script executes synchronously
      await page.evaluateOnNewDocument((targetMode) => {
        try {
          localStorage.setItem("tax_theme", targetMode);
        } catch (_) {}
      }, mode);

      await page.goto(BASE_URL, { waitUntil: "networkidle2" });

      // Guarantee html class aligns
      await page.evaluate((targetMode) => {
        if (targetMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, mode);

      await new Promise((r) => setTimeout(r, 600));

      const filename = `${mode}_${vp.name}_home.png`;
      const filepath = path.join(SCREENSHOTS_DIR, filename);
      await page.screenshot({ path: filepath, fullPage: false });
      console.log(`Saved screenshot: ${filename}`);

      // If mobile, test AppClip opening in this mode
      if (vp.isMobile) {
        // Click on the FBR 8-Window CTA or quick clip
        const opened = await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll("button"));
          const clipBtn = btns.find((b) => b.innerText.includes("FBR Simplified Return") || b.innerText.includes("Start FBR 8-Window"));
          if (clipBtn) {
            clipBtn.click();
            return true;
          }
          return false;
        });

        if (opened) {
          await new Promise((r) => setTimeout(r, 800));
          const clipFilename = `${mode}_mobile_appclip_fbr.png`;
          const clipFilepath = path.join(SCREENSHOTS_DIR, clipFilename);
          await page.screenshot({ path: clipFilepath, fullPage: false });
          console.log(`Saved screenshot: ${clipFilename}`);
        }
      }

      await page.close();
    }
  }

  await browser.close();
  serverProc.kill("SIGINT");
  console.log("All visual audit screenshots generated successfully!");
}

runVisualAudit().catch((err) => {
  console.error("Audit error:", err);
  serverProc.kill("SIGINT");
  process.exit(1);
});
