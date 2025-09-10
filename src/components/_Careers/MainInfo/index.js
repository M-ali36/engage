import React from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const MainInfo = ({data}) => {
    const {title, content, image} = data;
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.col}>
                        <h2 className={classes.title}>{title}</h2>
                        <RichText className={classes.content} content={content}/>
                    </div>
                    <div className={classes.col}>
                        <div className={classes.imageContainer}>
                            <AnimatedImage
                                image={image}
                                height={1920}
                                width={1080}
                                className={classes.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

MainInfo.propTypes = {
    text: PropTypes.object
};

export default MainInfo;