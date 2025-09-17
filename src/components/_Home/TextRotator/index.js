import React, { useEffect, useRef, useState } from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import * as classes from './index.module.css';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextRotator = ({ image, list }) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ screen size detection
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (!isMobile && listRef.current && containerRef.current) {
      const listHeight = listRef.current.getBoundingClientRect().height;
      const contHeight = containerRef.current.getBoundingClientRect().height;
      const dist = listHeight - contHeight;
      const items = gsap.utils.toArray(`.item-title`);

      const tl = gsap.timeline({ ease: "none" });
      items.forEach((item, i) => {
        if (i === 0) {
          tl.set(item, { color: "#FFD700", webkitTextFillColor: "#FFD700" }, 0);
        } else {
          tl.to(items, { color: "transparent", webkitTextFillColor: "transparent", duration: 0 }, i);
          tl.to(item, { color: "#FFD700", webkitTextFillColor: "#FFD700", duration: 0 }, i);
        }
      });

      const master = gsap.timeline({ ease: "none" });
      master.fromTo(
        listRef.current,
        { y: 100 },
        { y: -(dist + 100), duration: items.length, ease: "none" },
        0
      );
      master.add(tl, 0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + dist * 2,
        scrub: true,
        animation: master,
        pin: true,
      });

      // ✅ refresh once GSAP is ready
      ScrollTrigger.refresh(true);
    }
  }, [isMobile, list]);

  return (
    <SectionObserver>
      <div className={classes.root} ref={containerRef}>
        <div className={classes.imageContainer}>
          <AnimatedImage
            image={image}
            height={1080}
            width={1920}
            loading={isMobile ? 'eager' : "lazy"}
            className={classes.image}
          />
        </div>
        <div className={classes.cont}>
          <ul className={classes.list} ref={listRef}>
            {list.map((item, index) => (
              <li className={`${classes.item} item-title`} key={index}>
                <h2 className={classes.itemTitle}>{item}</h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionObserver>
  );
};

TextRotator.propTypes = {
  image: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.string),
};

export default TextRotator;
