import React, { useEffect, useRef } from 'react';
import Header from "@Layout/Header";
import Footer from "@Layout/Footer";
import VideoModal from '@Ui/VideoModal';
import { updateResized, useStore, setSmoothScroll } from "@UseCase/store";
import { getClampValue } from '@UseCase/style';
import NationalRegular from '@Src/fonts/National_2/national-2-regular.woff2';
import NationalBold from '@Src/fonts/National_2/national-2-extrabold.woff2';
import Signifier from '@Src/fonts/Signifier/signifier-light.woff2';
import Bravebison from '@Src/fonts/Bravebison/bravebison.woff2';
import Inter from '@Src/fonts/inter/Inter_28pt-Regular.woff2';
import { Helmet } from 'react-helmet';
import debounce from 'lodash/debounce';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { isSafari, isEdge, isIOS } from 'react-device-detect';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollSmoother);

const LayoutWrapper = ({ children, location }) => {
  const [store, dispatch] = useStore();
  const $header = useRef();

  // ✅ viewport height (safe)
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  };

  // ✅ header height
  const setHeaderHeight = () => {
    if ($header.current) {
      const newHeight = $header.current.getBoundingClientRect().height;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--headerHeight', `${newHeight}px`);
      });
    }
  };

  // ✅ init GSAP smooth scroll (only once)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let smoother = ScrollSmoother.get();
      if (!smoother) {
        smoother = ScrollSmoother.create({
          smooth: 1.3,
          wrapper: '#gatsby-focus-wrapper',
          content: '#smooth-content',
          normalizeScroll: isIOS,
          effects: true,
        });
      }
      setSmoothScroll(dispatch, smoother);
    }
  }, [dispatch]);

  // ✅ resize handling
  useEffect(() => {
    setViewportHeight();
    setHeaderHeight();

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        requestAnimationFrame(() => {
          setViewportHeight();
          setHeaderHeight();
          updateResized(dispatch);
        });
      }, 100)
    );

    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, [dispatch]);

  // ✅ robust scroll to top on route change
  // ✅ scroll instantly to top on route change
useEffect(() => {
  if (typeof window === 'undefined') return;

  const smoother = gsap.core.globals().ScrollSmoother?.get();

  const scrollToTop = () => {
    const activeSmoother = store?.smoothScroll || smoother;

    if (activeSmoother) {
      // jump to top without animation
      requestAnimationFrame(() => {
        activeSmoother.scrollTo(0, false);
      });
    } else {
      // instant native scroll
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  };

  // attempt immediately
  scrollToTop();

  // retry shortly to catch delayed smoother initialization
  const retry = setTimeout(scrollToTop, 100);
  const retry2 = setTimeout(scrollToTop, 300);

  return () => {
    clearTimeout(retry);
    clearTimeout(retry2);
  };
}, [location.pathname]);


  // ✅ (optional) route-updated event listener fallback
  useEffect(() => {
    const handleRouteUpdate = () => {
      const smoother = gsap.core.globals().ScrollSmoother?.get();
      if (smoother) smoother.scrollTo(0, true);
    };
    window.addEventListener("gatsby:routeUpdated", handleRouteUpdate);
    return () => window.removeEventListener("gatsby:routeUpdated", handleRouteUpdate);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://engagedigitalpartners.netlify.app" crossOrigin />

        {/* ✅ preload fonts early */}
        <link rel="preload" href={NationalRegular} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={NationalBold} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={Signifier} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={Bravebison} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={Inter} as="font" type="font/woff2" crossOrigin="anonymous" />

        <style>{`
          :root {
            --xxl-font-size: ${getClampValue(50, 135)};
            --5xl-font-size: ${getClampValue(50, 70)};
            --4xl-font-size: ${getClampValue(32, 60)};
            --3xl-font-size: ${getClampValue(32, 50)};
            --2xl-font-size: ${getClampValue(20, 36)};
            --xlm-font-size: ${getClampValue(20, 30)};
            --xl-font-size: ${getClampValue(20, 25)};
            --lg-font-size: ${getClampValue(16, 20)};
            --color-orange: #FF4F17;
          }
          @font-face {
            font-family: 'National';
            src: url(${NationalRegular}) format('woff2');
            font-weight: 200;
            font-display: swap;
            font-style: normal;
          }
          @font-face {
            font-family: 'National';
            src: url(${NationalBold}) format('woff2');
            font-weight: 700;
            font-display: swap;
            font-style: normal;
          }
          @font-face {
            font-family: 'Signifier';
            src: url(${Signifier}) format('woff2');
            font-weight: 300;
            font-display: swap;
            font-style: normal;
          }
          @font-face {
            font-family: 'Bravebison';
            src: url(${Bravebison}) format('woff2');
            font-weight: 700;
            font-display: swap;
            font-style: normal;
          }

          .item-title,
          #smooth-content,
          section,
          footer {
            will-change: transform, opacity;
          }

          footer { overflow: hidden; }
          section { margin-bottom: -1px; overflow: hidden; }
        `}</style>
      </Helmet>

      <Header ref={$header} location={location} />

      <div
        id="smooth-content"
        className={`${(isSafari || isEdge) ? 'boxedDevices' : ''} content changed`}
      >
        <main>{children}</main>
        <Footer location={location} />
      </div>

      <VideoModal />
    </>
  );
};

LayoutWrapper.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default LayoutWrapper;
