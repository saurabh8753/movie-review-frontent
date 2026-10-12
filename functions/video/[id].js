const API = "https://movie-review-worker.jaanewale6.workers.dev";
const SITE_TITLE = "🎬 Movie Review"; // ← keep in sync with index.html

export async function onRequest(context) {
  const { params } = context;
  const videoId = params.id;

  const res = await fetch(`${API}/videos?page=1`);
  const all = await res.json();
  const video = all.find((v) => v.video_id === videoId) || {
    title: "Video",
    channel_title: "",
  };

  const html = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${video.title} — ${SITE_TITLE}</title>
<meta name="description" content="${video.title} — ${video.channel_title}">
<meta property="og:title" content="${video.title}">
<meta property="og:type" content="video.other">
<meta property="og:image" content="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${video.title}",
  "thumbnailUrl": "https://i.ytimg.com/vi/${videoId}/hqdefault.jpg",
  "uploadDate": "${video.published_at || ""}",
  "embedUrl": "https://www.youtube.com/embed/${videoId}"
}
</script>
<style>
  body { background:#0f0f0f; color:#fff; font-family:sans-serif; margin:0; padding:20px; }
  .player { max-width:800px; margin:0 auto; }
  iframe { width:100%; height:450px; border:0; border-radius:8px; }
  h1 { font-size:20px; }
  a.back { color:#0078ff; text-decoration:none; }
  .ad-slot { max-width:800px; margin:16px auto; text-align:center; padding:16px; background:#181818; border-radius:8px; }
</style>
</head>
<body>
<div class="player">
  <a class="back" href="/">&larr; All Videos</a>
  <h1>${video.title}</h1>
  <p>${video.channel_title}</p>
  <iframe id="videoFrame" src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
  <div class="ad-slot">Ad Space</div>
</div>
<script>
  window.addEventListener("load", () => {
    document.getElementById("videoFrame").scrollIntoView({ behavior: "smooth", block: "center" });
  });
</script>
</body>
</html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
