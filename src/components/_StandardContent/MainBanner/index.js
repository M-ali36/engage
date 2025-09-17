import React from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const MainBanner = ({title, image}) => {
    
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
                <div className={classes.contentContainer}>
                    {title && <h1 className={classes.title}>{title}</h1>}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    text: PropTypes.object
};

export default MainBanner;