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
  * { box-sizing: border-box; }
  body {
    background: #0f0f0f;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    min-height: 100vh;
  }
  .player {
    max-width: 800px;
    margin: 0 auto;
  }
  a.back {
    color: #0078ff;
    text-decoration: none;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 12px;
  }
  a.back:hover { text-decoration: underline; }

  /* Short Video Player (9:16 Ratio) */
  .video-wrap {
    position: relative;
    width: 100%;
    max-width: 420px; 
    margin: 0 auto;
    aspect-ratio: 9 / 16; 
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  }
  .video-wrap > iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Floating Ad Container */
  #floating-ad {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 250px;
    z-index: 999;
    display: none; /* Initially hidden */
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.9);
  }
  #floating-ad iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  
  /* Professional Close Button */
  .close-ad-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 5px 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    z-index: 1000;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  }
  
  .close-ad-btn:hover {
    background: rgba(220, 38, 38, 0.95); 
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }

  h1 {
    font-size: 20px;
    line-height: 1.3;
    margin: 24px 0 4px;
    text-align: center;
  }
  .channel {
    color: #aaa;
    font-size: 14px;
    margin: 0 0 20px;
    text-align: center;
  }
  .ad-slot {
    max-width: 800px;
    margin: 16px auto;
    text-align: center;
    padding: 16px;
    background: #181818;
    border-radius: 8px;
    color: #666;
    font-size: 13px;
    border: 1px dashed #333;
    min-height: 60px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 480px) {
    body { padding: 12px; }
    h1 { font-size: 17px; margin-top: 16px; }
    .ad-slot { padding: 8px; }
  }
</style>
</head>
<body>
<div class="player">
  <a class="back" href="/">&larr; All Videos</a>

  <div class="video-wrap">
    <!-- Video Player -->
    <iframe
      id="videoFrame"
      src="https://www.youtube.com/embed/${videoId}"
      title="Video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"></iframe>

    <!-- Floating Ad (Hidden Initially) -->
    <div id="floating-ad">
      <button class="close-ad-btn" onclick="document.getElementById('floating-ad').style.display='none'">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        Close Ad
      </button>
    </div>
  </div>

  <h1>${video.title}</h1>
  <p class="channel">${video.channel_title}</p>

  <!-- Normal Ad Slots (Video ke niche) -->
  <div class="ad-slot" id="ad-slot-1">
    <div id="container-61516a95193f12ce773776b83c978db0"></div>
  </div>
  <div class="ad-slot" id="ad-slot-2"></div>
  <div class="ad-slot" id="ad-slot-3"></div>
  <div class="ad-slot" id="ad-slot-4"></div>
  <div class="ad-slot" id="ad-slot-5"></div>
  <div class="ad-slot" id="ad-slot-6"></div>
  <div class="ad-slot" id="ad-slot-7"></div>
</div>

<script>
  window.addEventListener("load", () => {
    document.getElementById("videoFrame").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  // ==========================================
  // 1. Normal Ads (2 second delay)
  // ==========================================
  setTimeout(function () {
    var ads = [
      { src: 'https://bancadeltempoidea.org/21/61516a95193f12ce773776b83c978db0' }, // Loader
      { options: { key: 'c16832523d0ec596289e0110e6785720', format: 'iframe', height: 250, width: 300, params: {} }, src: 'https://bancadeltempoidea.org/22/c16832523d0ec596289e0110e6785720' }, // 300x250 (Niche slot me)
      { options: { key: 'b3739b0109f940464133780034863325', format: 'iframe', height: 600, width: 160, params: {} }, src: 'https://bancadeltempoidea.org/22/b3739b0109f940464133780034863325' },
      { options: { key: 'a467a108a5231ad25a6eb9dcfdd84ad3', format: 'iframe', height: 300, width: 160, params: {} }, src: 'https://bancadeltempoidea.org/22/a467a108a5231ad25a6eb9dcfdd84ad3' },
      { options: { key: '6c44e56357f20300554d5b79f966a611', format: 'iframe', height: 50, width: 320, params: {} }, src: 'https://bancadeltempoidea.org/22/6c44e56357f20300554d5b79f966a611' },
      { options: { key: '17df622e97c3bd5cc866ce119ad9ec80', format: 'iframe', height: 60, width: 468, params: {} }, src: 'https://bancadeltempoidea.org/22/17df622e97c3bd5cc866ce119ad9ec80' },
      { options: { key: 'f9100328c1c3091d59c4ce1878ba6798', format: 'iframe', height: 90, width: 728, params: {} }, src: 'https://bancadeltempoidea.org/22/f9100328c1c3091d59c4ce1878ba6798' }
    ];

    function loadAd(i) {
      if (i >= ads.length) return;
      var ad = ads[i];
      var slot = document.getElementById('ad-slot-' + (i + 1));
      if (!slot) { loadAd(i + 1); return; }

      if (ad.options) { window.atOptions = ad.options; }

      var s = document.createElement('script');
      s.src = ad.src;
      s.async = false;
      s.onload = s.onerror = function () { loadAd(i + 1); };
      slot.appendChild(s);
    }

    loadAd(0);
  }, 2000);

  // ==========================================
  // 2. Floating 300x250 Ad (30 second delay)
  // ==========================================
  setTimeout(function () {
    var floatAd = document.getElementById('floating-ad');
    if (!floatAd) return;
    
    // Show the container
    floatAd.style.display = 'block';

    // Load the 300x250 Ad
    window.atOptions = {
      key: 'c16832523d0ec596289e0110e6785720',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    };

    var s = document.createElement('script');
    s.src = 'https://bancadeltempoidea.org/22/c16832523d0ec596289e0110e6785720';
    s.async = false;
    floatAd.appendChild(s);
  }, 30000);
</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}
