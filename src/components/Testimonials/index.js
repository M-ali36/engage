import React from 'react';
import PropTypes from 'prop-types';
import AnimatedImage from '@Ui/AnimatedImage'
import RichText from '@components/RichText'
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { GatsbyImage } from 'gatsby-plugin-image';
import Quote from '@Svg/quote.svg'


const Testimonials = ({items, image}) => {
    
    return (
        <>
        <SectionObserver className={classes.root}>
            {image &&
                <div className={classes.imageContainer}>
                    <AnimatedImage
                        image={image}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.cont}>
                <Quote className={classes.quoteIcon}/>
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    modules={[EffectFade]}
                    className={classes.swiper}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={classes.itemContainer}>
                                <RichText className={classes.content} content={item.content}/>
                                {item.image &&
                                    <div className={classes.itemImage}>
                                        <GatsbyImage 
                                            image={item.image.gatsbyImageData}
                                            alt={item.image.description}
                                            placeholder="blurred"
                                        />
                                    </div>
                                }
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </SectionObserver>
        </>
    );
};

Testimonials.propTypes = {
};

export default Testimonials;