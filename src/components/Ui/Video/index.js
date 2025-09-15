import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GatsbyImage } from "gatsby-plugin-image";
import * as classes from './index.module.css'; // CSS Modules

gsap.registerPlugin(ScrollTrigger);

const VideoComponent = ({ src, image }) => {
    

  return (
    <>
      <div className={classes.videoWrapper}>
        <div className={classes.videoContainer}>
          <GatsbyImage
            image={image?.gatsbyImageData}
            alt={image?.description || "About us background video thumbnail"}
            className="absolute min-h-full w-full object-cover"
            placeholder="blurred"
            height={1080}
            width={1920}
            loading="eager"
        />
          <video
            muted={true}
            autoPlay
            playsInline
            loop
            className={classes.videoItem}
            preload="auto"
          >
            <source src={src.file.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default VideoComponent;