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

  // ✅ detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ GSAP animation only for desktop
  useEffect(() => {
    if (!isMobile && listRef.current && containerRef.current) {
      const listHeight = listRef.current?.offsetHeight || 0;
      const contHeight = containerRef.current?.clientHeight || 0;
      const dist = listHeight - contHeight;
      const items = gsap.utils.toArray(`.item-title`);

      // timeline for text coloring
      const tl = gsap.timeline({ ease: "none" });
      items.forEach((item, i) => {
          if (i === 0) {
              // first item stays gold from the start
              tl.set(item, {
                color: "#FFD700",
                webkitTextFillColor: "#FFD700"
              }, 0);
          } else {
              // reset all
              tl.to(items, {
                color: "transparent",
                webkitTextFillColor: "transparent",
                duration: 0
              }, i);

              // highlight the current
              tl.to(item, {
                color: "#FFD700",
                webkitTextFillColor: "#FFD700",
                duration: 0
              }, i);
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

      const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + dist * 2,
          scrub: true,
          animation: master,
          pin: true,
          toggleActions: "play reverse play reverse"
      });

      // 🧹 Cleanup
      return () => {
        st.kill();
        gsap.killTweensOf(listRef.current);
        gsap.killTweensOf(items);
      };
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
            loaging={isMobile ? 'eager' : "lazy"}
            className={classes.image}
            
          />
        </div>
        <div className={classes.cont}>
          <ul className={classes.list} ref={listRef}>
            {list.map((item, index) => (
              <li 
                className={`${classes.item} item-title`} 
                key={index}
              >
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
