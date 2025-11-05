import React, { useLayoutEffect, forwardRef, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AnimatedText = forwardRef(
  (
    {
      text,
      as: Tag = "p",
      splitType = "words",
      direction = "right",
      triggerOnce = true,
      scrollTrigger = true,
      start = "top 100%",
      stagger = 0.12,
      duration = 0.3,
      ease = "power3.out",
      delay = 0,
      ...props
    },
    parentRef
  ) => {
    const textRef = useRef();
    const splitInstance = useRef(null);
    const ctx = useRef(null);

    const runAnimation = () => {
      if (!textRef.current) return;

      // clean up previous split
      if (splitInstance.current) {
        splitInstance.current.revert();
        splitInstance.current = null;
      }

      let targets = [textRef.current];

      // 🧩 skip SplitText if splitType === "combo"
      if (splitType !== "combo") {
        const split = new SplitText(textRef.current, { type: splitType });
        splitInstance.current = split;

        if (splitType.includes("chars")) targets = split.chars;
        else if (splitType.includes("lines")) targets = split.lines;
        else targets = split.words;
      }

      const fromVars = { opacity: 0 };
      switch (direction) {
        case "left":
          fromVars.x = -60;
          break;
        case "right":
          fromVars.x = 60;
          break;
        case "top":
          fromVars.y = -60;
          break;
        case "bottom":
          fromVars.y = 60;
          break;
        default:
          fromVars.x = 60;
      }

      const tl = gsap.timeline({
        delay,
        scrollTrigger: scrollTrigger
          ? {
              trigger: textRef.current,
              start,
              toggleActions: triggerOnce
                ? "play none none none"
                : "play none none reverse",
              markers: false,
              onEnter: () => {
                if (parentRef?.current)
                  gsap.to(parentRef.current, { opacity: 1, duration: 0 });
              },
            }
          : undefined,
      });

      tl.from(targets, {
        ...fromVars,
        duration,
        ease,
        stagger: splitType === "combo" ? 0 : stagger,
      });
    };

    useLayoutEffect(() => {
      ctx.current = gsap.context(() => {
        runAnimation();
      }, textRef);

      const handleRouteChange = () => {
        if (ctx.current) ctx.current.revert();
        if (splitInstance.current) {
          splitInstance.current.revert();
          splitInstance.current = null;
        }

        ScrollTrigger.getAll().forEach((st) => st.kill());

        setTimeout(() => {
          requestAnimationFrame(() => {
            runAnimation();
          });
        }, 100);

        if (parentRef?.current)
          gsap.to(parentRef.current, { opacity: 0, duration: 0 });
      };

      window.addEventListener("gatsby:routeUpdated", handleRouteChange);

      return () => {
        window.removeEventListener("gatsby:routeUpdated", handleRouteChange);
        if (ctx.current) ctx.current.revert();
        if (splitInstance.current) splitInstance.current.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, [
      splitType,
      direction,
      triggerOnce,
      scrollTrigger,
      start,
      stagger,
      duration,
      ease,
      delay,
    ]);

    return (
      <Tag
        ref={textRef}
        className="animated-text"
        style={{
          display: "block",
          overflow: "hidden",
          width: "100%",
        }}
        {...props}
      >
        {text}
      </Tag>
    );
  }
);

export default AnimatedText;
