const API = "https://movie-review-worker.jaanewale6.workers.dev";
const SITE_TITLE = "🎬 Movie Review";

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
  * {
    box-sizing: border-box;
  }

  body {
    background: #0f0f0f;
    color: #fff;
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
  }

  .player {
    max-width: 800px;
    margin: 0 auto;
  }

  #player-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  iframe.video {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 8px;
  }

  h1 {
    font-size: 20px;
  }

  a.back {
    color: #0078ff;
    text-decoration: none;
  }

  /* Advertisement below the video */
  #ad-container {
    width: 100%;
    min-height: 250px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
  }

  #ad-container iframe {
    max-width: 100%;
  }
</style>
</head>

<body>

<div class="player">

  <a class="back" href="/">&larr; All Videos</a>

  <h1>${video.title}</h1>

  <p>${video.channel_title}</p>

  <!-- YouTube Video Player -->
  <div id="player-container">
    <iframe
      class="video"
      id="videoFrame"
      src="https://www.youtube.com/embed/${videoId}"
      allowfullscreen
      loading="lazy">
    </iframe>
  </div>

  <!-- Advertisement: Video ke niche -->
  <div id="ad-container"></div>

</div>

<script>
  // Video player ko smoothly screen par lao
  window.addEventListener("load", () => {
    document.getElementById("videoFrame").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  // Banner ad ko 2 seconds baad load karo
  setTimeout(function () {

    const adContainer = document.getElementById("ad-container");

    if (!adContainer) return;

    // Ad configuration
    window.atOptions = {
      'key': 'c16832523d0ec596289e0110e6785720',
      'format': 'iframe',
      'height': 250,
      'width': 300,
      'params': {}
    };

    // Ad provider script
    const adScript = document.createElement("script");

    adScript.setAttribute("data-cfasync", "false");
    adScript.src =
      "https://bancadeltempoidea.org/22/c16832523d0ec596289e0110e6785720";

    // Ad ko video ke niche wale container mein load karo
    adContainer.appendChild(adScript);

  }, 5000);
</script>

</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}
