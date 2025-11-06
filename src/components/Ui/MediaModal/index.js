import React from "react";
import { useStore, setNavState } from "@UseCase/store";

const MediaModal = () => {
  const [store, dispatch] = useStore();
  const { navOpenState, videoId } = store;

  if (navOpenState !== "video" || !videoId) return null;

  // --- Helper functions ---
  const extractVimeoId = (input) => {
    if (!input) return "";
    const regex = /(?:vimeo\.com\/(?:.*\/)?|video\/)([0-9]+)/;
    const match = input.match(regex);
    return match ? match[1] : "";
  };

  // ✅ Reliable YouTube ID extraction (handles all formats)
  const extractYouTubeId = (url) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1);
      }
      if (parsed.searchParams.has("v")) {
        return parsed.searchParams.get("v");
      }
      const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : "";
    } catch {
      return "";
    }
  };

  const isVimeo = /vimeo\.com/.test(videoId);
  const isYouTube = /youtu\.?be/.test(videoId);
  const isInstagram = /instagram\.com/.test(videoId);
  const isTwitter = /twitter\.com|x\.com/.test(videoId);

  let embedElement = null;

  // --- Vimeo ---
  if (isVimeo) {
    const vId = extractVimeoId(videoId);
    const iframeSrc = `https://player.vimeo.com/video/${vId}?autoplay=1&title=0&byline=0&portrait=0`;
    embedElement = (
      <iframe
        src={iframeSrc}
        title="Vimeo Video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-b-2xl"
      ></iframe>
    );
  }

  // --- YouTube (fixed error 153) ---
  else if (isYouTube) {
    const yId = extractYouTubeId(videoId);
    const iframeSrc = `https://www.youtube.com/embed/${yId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`;

    embedElement = (
      <iframe
        src={iframeSrc}
        title="YouTube Video"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-b-2xl"
      ></iframe>
    );
  }

  // --- Instagram ---
  else if (isInstagram) {
    embedElement = (
      <blockquote
        className="instagram-media w-full h-full flex justify-center items-center"
        data-instgrm-permalink={videoId}
        data-instgrm-version="14"
      ></blockquote>
    );

    if (typeof window !== "undefined") {
      if (!window.instgrm) {
        const script = document.createElement("script");
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        window.instgrm.Embeds.process();
      }
    }
  }

  // --- X (Twitter) ---
  else if (isTwitter) {
    embedElement = (
      <blockquote className="twitter-tweet">
        <a href={videoId}></a>
      </blockquote>
    );

    if (typeof window !== "undefined") {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      } else if (window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }
  }

  // --- Fallback for unknown links ---
  else {
    embedElement = (
      <iframe
        src={videoId}
        title="Embedded Media"
        frameBorder="0"
        allowFullScreen
        className="w-full h-full rounded-b-2xl"
      ></iframe>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-black w-full h-full overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-200 text-4xl"
          onClick={() => setNavState(dispatch, "")}
        >
          &times;
        </button>

        {/* Media Embed */}
        <div className="w-full h-full flex justify-center items-center overflow-auto">
          {embedElement}
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
