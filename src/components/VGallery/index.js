import React, { useEffect, useRef } from 'react';
import * as classes from './index.module.css';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { GatsbyImage } from 'gatsby-plugin-image';
import SectionObserver from '@components/SectionObserver';

const VGallery = ({ gallery }) => {

  const mainRef = useRef();
  const marqueeRefs = useRef([]);

  const numberOfColumns = 3; // Adjust this as needed
  const columns = Array.from({ length: numberOfColumns }, () => []);

  // Distribute images evenly into columns
  gallery.forEach((item, index) => {
    columns[index % numberOfColumns].push(item);
  });

  // Calculate max column length
  const maxItems = Math.max(...columns.map(col => col.length));

  // Pad the last column if it has fewer items
  const lastIndex = columns.length - 1;
  const lastColumn = columns[lastIndex];
  while (lastColumn.length < maxItems) {
    // Push repeated items from the start of the column
    lastColumn.push(lastColumn[lastColumn.length % lastColumn.length]);
  }

  // Assign refs to each column
  marqueeRefs.current = columns.map((_, i) => marqueeRefs.current[i] || React.createRef());

  const Item = ({ image }) => (
    <div className={classes.itemContainer}>
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.description || ''}
        placeholder="blurred"
      />
    </div>
  );

  const runAnimation = () => {
    columns.forEach((_, index) => {
      const marqueeRef = marqueeRefs.current[index];
      const group = marqueeRef.current;

      if (group) {
        gsap.killTweensOf(group.children);

        const height = parseInt(getComputedStyle(group).getPropertyValue('height'), 10);
        const distance = (height + 32) / 2;
        const isOdd = index % 2 !== 0;

        gsap.fromTo(
          group.children,
          { y: isOdd ? -distance : 0 },
          {
            y: isOdd ? 0 : -distance,
            duration: gallery.length * 1.5,
            ease: 'none',
            repeat: -1,
          }
        );
      }
    });
  };

  useEffect(() => {
    runAnimation();
  }, [gallery]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    let prevHeight = el.offsetHeight;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newHeight = entry.contentRect.height;
        if (newHeight !== prevHeight) {
          prevHeight = newHeight;
          runAnimation();
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={classes.root}>
        <div className={classes.galleryRow} ref={mainRef}>
          {columns.map((column, index) => (
            <div
              className={classes.col}
              key={index}
              ref={marqueeRefs.current[index]}
            >
              <div className={classes.columnContent}>
                {column.map((item, subIndex) => (
                  <Item key={subIndex} image={item} />
                ))}
                {column.map((item, subIndex) => (
                  <Item key={`dup-${subIndex}`} image={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

VGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

export default VGallery;
