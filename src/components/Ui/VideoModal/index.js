import React, { useState } from "react";
import {useStore, setNavState} from '@UseCase/store'

const VimeoModal = () => {

    const [store , dispatch] = useStore();
    const {navOpenState, videoId} = store;

  if (navOpenState !== 'video') return null;

  const extractVimeoId = (input) => {
    if (!input) return "";
    const regex = /(?:vimeo\.com\/(?:.*\/)?|video\/)([0-9]+)/;
    const match = input.match(regex);
    return match ? match[1] : input; // if it's already an ID
  };

  const vId = extractVimeoId(videoId);
  const iframeSrc = `https://player.vimeo.com/video/${vId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">
      <div className="relative bg-black w-full h-full overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white hover_text-gray-200 text-4xl"
          onClick={() => setNavState( dispatch, '')}
        >
          &times;
        </button>

        {/* Vimeo Iframe */}
        <div className="w-full h-full">
          <iframe
            src={iframeSrc}
            title="Vimeo Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-b-2xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VimeoModal;