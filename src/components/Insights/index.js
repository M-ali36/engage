import React from 'react';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import ArrowIcon from '@Svg/link-arrow.svg'
import 'swiper/css';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Insights = ({title, items}) => {
    return (
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.subTitle}>Insights</h2>
                <div className={classes.titleContainer}>
                    <RichText className={classes.title} content={title}/>
                    <Link className={classes.titleLink} to="/insights"><span className={classes.linkText}>View All Insights</span> <ArrowIcon className={classes.icon}/></Link>
                </div>
            </div>
            <div className={classes.sliderContainer}>
                <Swiper
                    spaceBetween={30}
                    className={classes.swiper}
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
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    >
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={classes.itemContainer}>
                                <div className={classes.imageContainer}>
                                    <AnimatedImage
                                        image={item.mainImage}
                                        height={450}
                                        width={450}
                                        className={classes.image}
                                    />
                                </div>
                                <div className={classes.content}>
                                    <h3 className={classes.itemTitle}>{item.title}</h3>
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
                                        <Link className={classes.link} to={`/insights/${item.slug}`}>Send Me more</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </SectionObserver>
    );
};

Insights.propTypes = {
    
};

export default Insights;