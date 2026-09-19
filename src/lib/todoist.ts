export interface TodoistTaskOptions {
  content: string;
  description?: string;
  priority?: number;
  dueString?: string;
}

export async function createTodoistTask(options: TodoistTaskOptions | string, desc?: string) {
  const token = process.env.TODOIST_API_TOKEN?.trim();
  if (!token) {
    console.warn("[Todoist] TODOIST_API_TOKEN not set — skipping notification");
    return null;
  }

  const content = typeof options === "string" ? options : options.content;
  const description = typeof options === "string" ? desc : options.description;
  const priority = typeof options === "string" ? 4 : (options.priority ?? 4);

  try {
    const res = await fetch("https://api.todoist.com/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        description,
        priority, // 4 is P1 (Highest in Todoist)
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Todoist] Error response:", res.status, errText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("[Todoist] Failed to create task notification:", error);
    return null;
  }
}
