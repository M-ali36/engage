import React, { useEffect, useCallback, useRef } from 'react';
import Header from "@Layout/Header";
import Footer from "@Layout/Footer";
import { updateResized, loadFonts, useStore, setSmoothScroll } from "@UseCase/store";
import { getClampValue } from '@UseCase/style';
import NationalRegular from '@Src/fonts/National_2/national-2-regular.woff2';
import NationalBold from '@Src/fonts/National_2/national-2-extrabold.woff2';
import Signifier from '@Src/fonts/Signifier/signifier-light.woff2';
import Bravebison from '@Src/fonts/Bravebison/bravebison.woff2';
import Inter from '@Src/fonts/inter/Inter_28pt-Regular.woff2';
import { Helmet } from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver'; // Add FontFaceObserver
import debounce from 'lodash/debounce';
import gsap from 'gsap'; // Import GSAP
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { isSafari, isEdge, isIOS } from 'react-device-detect'
import PropTypes from 'prop-types';

gsap.registerPlugin( ScrollSmoother);

const LayoutWrapper = ({ children, location }) => {
  const [store, dispatch] = useStore();
  const $header = useRef();

  // Handle viewport height for responsive design
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const initSmoothScroll = () => {
    if (typeof window !== 'undefined') {
      const smoother = ScrollSmoother.create({
        smooth: 1.3,
        wrapper: '#gatsby-focus-wrapper',
        content: '#smooth-content',
        normalizeScroll: isIOS,
        effects: true,
      });

      setSmoothScroll(dispatch, smoother);
    }
  };

  // Handle header and footer heights dynamically
  const setHeaderHeight = () => {
    document.documentElement.style.setProperty(
      '--headerHeight',
      `${$header.current.offsetHeight}px`
    );
  };

  useEffect(() => {
    initSmoothScroll(); // Initialize smooth scroll after component mount
  }, []);

  const smoothScrollRef = useRef()
  useEffect(() => {
    smoothScrollRef.current = store.smoothScroll
  }, [store.smoothScroll])

  // Handle font loading
  const handleWebfontLoad = useCallback(() => {
    const observers = [];
    const fontData = {
      'Inter': { weight: 500 }
    };

    Object.keys(fontData).forEach(family => {
      const data = fontData[family];
      const obs = new FontFaceObserver(family, data);
      observers.push(obs.load());
    });

    Promise.all(observers)
      .then(() => {
        loadFonts(dispatch); // Assuming you have a dispatch method to update state
      })
      .catch(err => {
        console.warn('Some critical fonts are not available', err);
      });
  }, [dispatch]);

  // Resize handler
  const handleResize = useCallback(() => {
    setViewportHeight();
    setHeaderHeight();
  }, []);

  useEffect(() => {
    // Load fonts and adjust heights on mount
    handleResize();
    handleWebfontLoad();

    // Add resize event listener
    const resizeObserver = new ResizeObserver(
      debounce(() => {
        updateResized(dispatch); // Assuming you have an updateResized action in your store
      }, 50)
    );
    resizeObserver.observe(document.body); // Start observing body or another container element

    return () => {
      resizeObserver.disconnect(); // Cleanup on component unmount
    };
  }, [handleResize, handleWebfontLoad, dispatch]);

  useEffect(() => {
    if (store?.navOpenState) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  }, [store?.navOpenState]);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          :root {
            --xxl-font-size: ${getClampValue(50, 135 )};
            --5xl-font-size: ${getClampValue(50, 70 )};
            --4xl-font-size: ${getClampValue(32, 60 )};
            --3xl-font-size: ${getClampValue(32, 50 )};
            --2xl-font-size: ${getClampValue(20, 36 )};
            --xlm-font-size: ${getClampValue(20, 30 )};
            --xl-font-size: ${getClampValue(20, 25 )};
            --lg-font-size: ${getClampValue(16, 20 )};
          }
          @font-face {
            font-family: 'National';
            src: url(${NationalRegular}) format('woff2');
            font-weight: 200;
            font-display: swap;
          }

          @font-face {
            font-family: 'National';
            src: url(${NationalBold}) format('woff2');
            font-weight: 700;
            font-display: swap;
          }

          @font-face {
            font-family: 'Signifier';
            src: url(${Signifier}) format('woff2');
            font-weight: 300;
            font-display: swap;
          }

          @font-face {
            font-family: 'Bravebison';
            src: url(${Bravebison}) format('woff2');
            font-weight: 700;
            font-display: swap;
          }

           footer {
            overflow: hidden;
          }
          section:not([class]) {
            margin-bottom: -1px;
          }
        `}</style>
      </Helmet>
      <Header ref={$header} location={location} />
      <div id="smooth-content" className={`${(isSafari || isEdge) ? 'boxedDevices' : ''} content changed`}>
        <main>{children}</main>
        <Footer location={location} />
      </div>
    </>
  );
};

LayoutWrapper.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default LayoutWrapper;
