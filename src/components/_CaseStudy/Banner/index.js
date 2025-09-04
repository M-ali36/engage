import React, { useState, useRef, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import * as classes from "./index.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Banner = ({ videoId, image }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // detect service + extract real ID
  const parseVideo = (input) => {
    if (!input) return { service: null, id: "" };

    try {
      const url = new URL(input);
      if (url.hostname.includes("youtube.com")) {
        return { service: "youtube", id: url.searchParams.get("v") };
      }
      if (url.hostname.includes("youtu.be")) {
        return { service: "youtube", id: url.pathname.replace("/", "") };
      }
      if (url.hostname.includes("vimeo.com")) {
        return { service: "vimeo", id: url.pathname.split("/").filter(Boolean)[0] };
      }
    } catch (e) {
      // not a valid URL → assume it's an ID (default vimeo)
      return { service: "vimeo", id: input };
    }

    return { service: "vimeo", id: input };
  };

  const { service, id } = parseVideo(videoId);

  // Lazy load iframe only if there's a videoId
  useEffect(() => {
    if (!id) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIframeLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [id]);

  // Toggle audio
  const toggleAudio = () => {
    if (!iframeRef.current) return;

    if (service === "vimeo") {
      const command = isMuted
        ? { method: "setVolume", value: 1 }
        : { method: "setVolume", value: 0 };
      iframeRef.current.contentWindow.postMessage(JSON.stringify(command), "*");
    }

    if (service === "youtube") {
      const command = isMuted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}';
      iframeRef.current.contentWindow.postMessage(command, "*");
    }

    setIsMuted(!isMuted);
  };

  const getIframeSrc = () => {
    if (service === "youtube") {
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1`;
    }
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1&playsinline=1`;
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden flex flex-col"
      >
        {/* Always render the image */}
        <GatsbyImage
          image={image?.gatsbyImageData}
          alt={image?.description || "Background image"}
          className="absolute min-h-full w-full object-cover"
          placeholder="blurred"
          height={1080}
          width={1920}
          loading="eager"
        />

        {/* Only render video if a valid id exists */}
        {id && iframeLoaded && (
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={getIframeSrc()}
            title="Background video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </section>

      <div className="video-frame-end"></div>
    </>
  );
};

export default Banner;
