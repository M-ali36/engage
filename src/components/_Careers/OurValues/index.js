import React, { useRef, useState } from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import * as classes from './index.module.css'
import { GatsbyImage } from 'gatsby-plugin-image';
import Arrow from '@Svg/slider-arrow.svg'
import { EffectFade, EffectCube } from 'swiper/modules';

const OurValues = ({items}) => {
    const imageSwiperRef = useRef(null);
    const textSwiperRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (imageSwiperRef.current && currentIndex > 0) {
            imageSwiperRef.current.slidePrev();
        }
        if (textSwiperRef.current && currentIndex > 0) {
            textSwiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (imageSwiperRef.current && currentIndex < items.length - 1) {
            imageSwiperRef.current.slideNext();
        }
        if (textSwiperRef.current && currentIndex < items.length - 1) {
            textSwiperRef.current.slideNext();
        }
    };

    return (
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.title}>Our Values</h2>
                <div className={classes.row}>
                    {/* Image Slider with Cube Effect */}
                    <div className={classes.col}>
                        <Swiper
                            modules={[EffectCube]}
                            effect="cube"
                            cubeEffect={{
                                shadow: false,
                                slideShadows: true,
                                shadowOffset: 20,
                                shadowScale: 0.94,
                            }}
                            onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
                            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        >
                            {items.map((item, index) => (
                                <SwiperSlide key={index} className={classes.swiperSlide}>
                                    <div className={classes.imageContainer}>
                                        <GatsbyImage
                                            image={item.image.gatsbyImageData}
                                            alt={item.image.description}
                                            className={classes.image}
                                            placeholder="blurred"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Text Slider with Fade Effect */}
                    <div className={classes.colContent}>
                        <Swiper
                            modules={[EffectFade]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            onSwiper={(swiper) => (textSwiperRef.current = swiper)}
                            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        >
                            {items.map((item, index) => (
                                <SwiperSlide key={index} className={classes.swiperSlide}>
                                    <RichText className={classes.content} content={item.content}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation Buttons */}
                        <div className={classes.sliderBtns}>
                            <button
                                className={classes.btn}
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                            >
                                <Arrow className={classes.iconPrev}/>
                            </button>
                            <button
                                className={classes.btn}
                                onClick={handleNext}
                                disabled={currentIndex === items.length - 1}
                            >
                                <Arrow className={classes.icon}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionObserver>
    );
};

OurValues.propTypes = {
    items: PropTypes.array.isRequired
};

export default OurValues;
