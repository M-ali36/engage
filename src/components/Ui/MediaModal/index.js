import React from "react";
import { useStore, setNavState } from "@UseCase/store";

const MediaModal = () => {
  const [store, dispatch] = useStore();
  const { navOpenState, videoId } = store;

  if (navOpenState !== "video") return null;
  if (!videoId) return null;

  // --- Helper functions ---
  const extractVimeoId = (input) => {
    const regex = /(?:vimeo\.com\/(?:.*\/)?|video\/)([0-9]+)/;
    const match = input.match(regex);
    return match ? match[1] : "";
  };

  const extractYouTubeId = (input) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = input.match(regex);
    return match ? match[1] : "";
  };

  const isVimeo = /vimeo\.com/.test(videoId);
  const isYouTube = /youtu\.?be/.test(videoId);
  const isInstagram = /instagram\.com/.test(videoId);
  const isTwitter = /twitter\.com|x\.com/.test(videoId);

  let embedElement = null;

  // --- Vimeo ---
  if (isVimeo) {
    const vId = extractVimeoId(videoId);
    const iframeSrc = `https://player.vimeo.com/video/${vId}`;
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
  // --- YouTube ---
  else if (isYouTube) {
    const yId = extractYouTubeId(videoId);
    const iframeSrc = `https://www.youtube.com/embed/${yId}`;
    embedElement = (
      <iframe
        src={iframeSrc}
        title="YouTube Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
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
    // Load Instagram embed script if not already present
    if (typeof window !== "undefined" && !window.instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }
  // --- X (Twitter) ---
  else if (isTwitter) {
    embedElement = (
      <blockquote className="twitter-tweet">
        <a href={videoId}></a>
      </blockquote>
    );
    // Load Twitter embed script if not already present
    if (typeof window !== "undefined" && !window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }
  // --- Fallback for unknown links (generic iframe) ---
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
