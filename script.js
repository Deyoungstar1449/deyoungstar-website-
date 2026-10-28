export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoint to load saved publications/songs/videos
    if (url.pathname === "/api/content" && request.method === "GET") {
      const data = await env.CONTENT_DB.get("published_items");
      return new Response(data || "[]", {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Endpoint to save content submitted from admin panel
    if (url.pathname === "/api/content" && request.method === "POST") {
      const body = await request.json();
      let existing = await env.CONTENT_DB.get("published_items", { type: "json" }) || [];
      existing.unshift(body);
      await env.CONTENT_DB.put("published_items", JSON.stringify(existing));
      return new Response(JSON.stringify({ status: "success" }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // Serve static site assets by default
    return env.ASSETS.fetch(request);
  }
};
