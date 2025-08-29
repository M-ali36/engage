import React, { useEffect, useState, useRef } from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import AnimatedImage from '@Ui/AnimatedImage';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

const OurDifference = ({ title, images }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Refs for swiper buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // ✅ detect screen width
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ GSAP ScrollTrigger only for desktop
  useEffect(() => {
    if (!isMobile) {
      const slides = document.querySelector(".slides");

      let ctx = gsap.context(() => {
        gsap.to(slides, {
          x: () => -(slides.scrollWidth - document.documentElement.clientWidth) + "px",
          ease: "none",
          scrollTrigger: {
            trigger: ".slidesWrapper",
            start: "top top",
            pin: true,
            scrub: true,
            end: (self) => `+=${self.trigger.offsetWidth * 2}`,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (images.length - 1),
              duration: { min: 0, max: 0.6 },
              directional: [0, 0.5, 1],
              delay: 0,
              ease: 'power3.inOut'
            }
          }
        });
      });

      // 🧹 Cleanup GSAP animations & triggers
      return () => ctx.revert();
    }
  }, [isMobile, images.length]);

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <RichText
          content={title}
          className={classes.title}
          useHeadings="heading 2"
        />
      </div>

      {isMobile ? (
        // 📱 Mobile → Swiper with Navigation
        <div className={classes.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={classes.imageContainer}>
                  <AnimatedImage
                    image={item}
                    height={1920}
                    width={1080}
                    className={classes.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ Custom Navigation Buttons */}
          <div className={classes.swiperNav}>
            <button ref={prevRef} className={classes.prevBtn}>Prev</button>
            <button ref={nextRef} className={classes.nextBtn}>Next</button>
          </div>
        </div>
      ) : (
        // 💻 Desktop → GSAP horizontal scroll
        <div className="slidesWrapper">
          <div className={`${classes.slidesContainer} slides`}>
            {images.map((item, index) => (
              <div className={classes.imageContainer} key={index}>
                <AnimatedImage
                  image={item}
                  height={1920}
                  width={1080}
                  className={classes.image}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="slides-end"></div>
    </SectionObserver>
  );
};

OurDifference.propTypes = {
  text: PropTypes.object
};

export default OurDifference;
