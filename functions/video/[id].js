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
  #player-container { position: relative; width:100%; height:450px; }
  iframe { width:100%; height:100%; border:0; border-radius:8px; }
  h1 { font-size:20px; }
  a.back { color:#0078ff; text-decoration:none; }
</style>
</head>
<body>
<div class="player">
  <a class="back" href="/">&larr; All Videos</a>
  <h1>${video.title}</h1>
  <p>${video.channel_title}</p>
  
  <!-- Player Container with Overlay support for Smart Link Ad -->
  <div id="player-container">
    <iframe id="videoFrame" src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe>
  </div>
</div>
<script>
  window.addEventListener("load", () => {
    document.getElementById("videoFrame").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  let adReady = false;
  let adOpened = false;

  // 10 second ke baad smart link ad activate hoga (kahin bhi click par)
  setTimeout(function () {
    adReady = true;

    if (!adOpened) {
      var container = document.getElementById('player-container');
      if (container) {
        var overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '999';
        overlay.style.background = 'transparent';
        overlay.style.cursor = 'pointer';

        overlay.addEventListener('click', function () {
          if (adOpened) return;
          adOpened = true;
          window.open("https://uplcm.com/4/11282250", "_blank");
          overlay.remove(); // Click hone par overlay hat jayega taaki user video control kar sake
        });

        container.appendChild(overlay);
      }
    }
  }, 10000);

  // Baaki page par kahin bhi click karne par (10 second ke baad)
  document.addEventListener("click", function (e) {
    if (!adReady || adOpened) return;
    
    var container = document.getElementById('player-container');
    if (container && !container.contains(e.target)) {
      adOpened = true;
      window.open("https://uplcm.com/4/11282250", "_blank");
    }
  });
</script>
</body>
</html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
