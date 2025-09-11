import React from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const OurLocations = ({items}) => {
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.title}>Our Locations</h2>
                <div className={classes.row}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <div className={classes.imageContainer}>
                                <AnimatedImage
                                    image={item.image}
                                    height={1920}
                                    width={1080}
                                    className={classes.image}
                                />
                            </div>
                            <h3 className={classes.itemTitle}>{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

OurLocations.propTypes = {
    text: PropTypes.object
};

export default OurLocations;