import React, { useRef, useState } from 'react';
import RichText from '@components/RichText'
import * as classes from './index.module.css'
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SectionObserver from '@components/SectionObserver';
import Item from './item';

const Tiktok = ({ title, list }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  

  const handlePrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && !isEnd) {
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
              disabled={isBeginning}
            >
              Previous
            </button>
            <button
              className={classes.btn}
              onClick={handleNext}
              disabled={isEnd}
            >
              Next
            </button>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          className={classes.swiper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {list.length > 0 &&
            list.map((item, index) => (
              <SwiperSlide key={index}>
                <Item item={item}/>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </SectionObserver>
  );
};

Tiktok.propTypes = {
  title: PropTypes.object,
  list: PropTypes.array,
};

export default Tiktok;
