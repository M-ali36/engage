import React, { useState, useEffect, useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as classes from "./index.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player"; 

gsap.registerPlugin(ScrollTrigger);

const VideoBanner = ({ videoId, image }) => {
  const iframeRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  // Init Vimeo Player
  useEffect(() => {
    if (iframeRef.current) {
      playerRef.current = new Player(iframeRef.current);

      // Ensure autoplay works muted
      playerRef.current.setVolume(0);
    }
  }, []);

  const toggleAudio = async () => {
    if (!playerRef.current) return;

    if (isMuted) {
      await playerRef.current.setVolume(1);
      setIsMuted(false);
    } else {
      await playerRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  // Pinning with ScrollTrigger
  useEffect(() => {
    const filterContainer = document.querySelector(".audio-toggle");
    ScrollTrigger.create({
      trigger: filterContainer,
      start: "top bottom",
      end: "bottom bottom",
      endTrigger: ".video-frame-end",
      pin: true,
      scrub: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section className="relative w-full aspect-video overflow-hidden flex flex-col">
        {/* Audio toggle button */}
        <div className="audio-toggle relative z-10">
          <div className={classes.audioToggle} onClick={toggleAudio}>
            <span className={classes.btnTitle}>
              Audio {isMuted ? "Off" : "On"}
            </span>
          </div>
        </div>

        {/* Fallback Thumbnail (SEO + performance) */}
        <GatsbyImage
          image={image?.gatsbyImageData}
          alt={image?.description || "About us background video thumbnail"}
          className="absolute min-h-full w-full object-cover"
          placeholder="blurred"
          height={1080}
          width={1920}
          loading="eager"
        />

        {/* Vimeo iframe (only loads once, no reload on toggle) */}
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&playsinline=1`}
          title="Background video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
      <div className="video-frame-end"></div>
    </>
  );
};

export default VideoBanner;
