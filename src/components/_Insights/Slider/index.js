import React, { useRef, useState } from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Link } from 'gatsby';

const Slider = ({ items, title }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (swiperRef.current && currentIndex > 0) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && currentIndex < items.length - 1) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.titleContainer}>
          {title && (
            <RichText
              useHeadings="Heading 2"
              className={classes.title}
              content={title}
            />
          )}
          <div className={classes.sliderBtns}>
            <button
              className={classes.btn}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className={classes.btn}
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className={classes.sliderContainer}>
          <Swiper
            modules={[Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} className={classes.swiperSlide}>
                <Link to={`/insights/${item.slug}`}>
                  {item.mainBanner && (
                    <div className={classes.imageContainer}>
                      <AnimatedImage
                        image={item.mainBanner}
                        height={1920}
                        width={1080}
                        className={classes.image}
                      />
                    </div>
                  )}
                  <div className={classes.itemContent}>
                      <div>
                          <span className={classes.tags} data-tags="true">
                              {item.metadata.tags
                                  .filter(tag => tag.name.startsWith("Article:"))
                                  .slice(0, 1)
                                  .map((tag, index2) => (
                                      <span className={classes.tag} key={index2}>
                                      {tag.name.split(": ")[1] || tag.name}:
                                      </span>
                              ))}
                          </span>
                          {item.featuredTitle && <RichText className={classes.itemTitle} content={item.featuredTitle} useHeadings="Heading 3"/>}
                      </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 👇 Custom Pagination Dots */}
        <div className={classes.customPagination}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${classes.dot} ${
                currentIndex === index ? classes.activeDot : ''
              }`}
              onClick={() => swiperRef.current.slideTo(index)}
            />
          ))}
        </div>
      </div>
    </SectionObserver>
  );
};

Slider.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.object,
};

export default Slider;
