import React, { useState, useEffect, useRef } from 'react';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import ArrowIcon from '@Svg/link-arrow.svg'
import 'swiper/css';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1024 : false
    );

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktop;
};

const Insights = ({ title, items }) => {
    const isDesktop = useIsDesktop();

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
                <h2 className={classes.subTitle}>Insights</h2>
                <div className={classes.titleContainer}>
                    <RichText className={classes.title} content={title} />
                    <Link className={classes.titleLink} to="/insights">
                        <span className={classes.linkText}>View All Insights</span>
                        <ArrowIcon className={classes.icon} />
                    </Link>
                </div>
            </div>

            <div className={classes.sliderContainer}>
                {isDesktop ? (
                    <Swiper
                        spaceBetween={35}
                        className={classes.swiper}
                        slidesPerView={3}
                        autoHeight={false}
                        modules={[Pagination]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className={classes.slide}>
                                <InsightItem item={item} classes={classes} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={classes.mobileList}>
                        {items.map((item, index) => (
                            <div key={index}>
                                <InsightItem item={item} classes={classes} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classes.bottomSec}>
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
        </SectionObserver>
    );
};

const InsightItem = ({ item, classes }) => (
    <div className={classes.itemContainer}>
        <div className={classes.imageContainer}>
            <AnimatedImage
                image={item.mainImage}
                height={450}
                width={450}
                className={classes.image}
            />
        </div>
        <h3 className={classes.itemTitle}>{item.title}</h3>
        <div className={classes.content}>
            <span className={classes.itemExcerpt}>{item.excerpt?.excerpt}</span>
            <div className={classes.meta}>
                <div className={classes.authorImage}>
                    <AnimatedImage
                        image={item.author.image}
                        height={40}
                        width={40}
                        className={classes.image}
                    />
                </div>
                <div className={classes.metaContent}>
                    <span className={classes.authorName}>{item.author.title}</span>
                    <span className={classes.info}>{item.date} • 5min read </span>
                </div>
                <Link className={classes.link} to={`/insights/${item.slug}`}>
                    Read more
                </Link>
            </div>
        </div>
    </div>
);

Insights.propTypes = {
    title: PropTypes.object,
    items: PropTypes.array.isRequired,
};

export default Insights;
