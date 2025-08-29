import React, { useEffect, useRef } from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import WorldMap from '@Svg/world-map.svg';
import * as classes from './index.module.css';
import gsap from 'gsap';

const WhoWeServe = ({ title }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 1024 && mapRef.current) {
      const paths = mapRef.current.querySelectorAll(".world-map > path"); 

      paths.forEach((path) => {
        gsap.to(path, {
          opacity: 0.4,
          duration: gsap.utils.random(1, 2),
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 3),
          ease: "power1.inOut",
        });
      });
    }
  }, []);

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.titleContainer}>
          <h2 className={classes.miniTitle}>Who we serve</h2>
          <RichText
            content={title}
            className={classes.title}
          />
        </div>
        <div ref={mapRef} className={classes.map}>
          <WorldMap className="world-map"/>
        </div>
        <ul className={classes.worldList}>
          <li></li>
        </ul>
      </div>
    </SectionObserver>
  );
};

WhoWeServe.propTypes = {
  title: PropTypes.object
};

export default WhoWeServe;
