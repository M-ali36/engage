import React, { useEffect, useRef } from 'react';
import * as classes from './index.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const AnimatedImage = ({ image, height, width, loading = 'lazy', ...props }) => {
    const { gatsbyImageData, description } = image;

    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            imageRef.current.querySelector(".gatsby-image-wrapper"),
            {
                scale: 1.08,
            },
            {
                scale: 1,
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className={classes.animatedImage} ref={imageRef} {...props}>
            <GatsbyImage
                image={gatsbyImageData}
                alt={description}
                className={classes.image}
                placeholder="blurred"
                height={height}
                width={width}
                loading={loading}
            />
        </div>
    );
};

AnimatedImage.propTypes = {
    image: PropTypes.object,
};

export default AnimatedImage;
