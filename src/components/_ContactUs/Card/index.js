import React from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import ArrowIcon from '@Svg/link-arrow.svg'
import { Link } from 'gatsby';

const Card = ({data, partnerTitle}) => {

    const {title, rule, image} = data;
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.colImage}>
                        <div className={classes.imageContainer}>
                            <AnimatedImage
                                image={image}
                                height={1024}
                                width={683}
                                className={classes.image}
                            />
                        </div>
                        <div className={classes.content}>
                            <span className={classes.memberTitle}>{title}</span>
                            <span className={classes.memberRule}>{rule}</span>
                        </div>
                    </div>
                    <div className={classes.colContent}>
                        <RichText content={partnerTitle} className={classes.title} useHeadings="Heading 2"/>
                    </div>
                    <div className={classes.colLink}>
                        <Link className={classes.link} to="#">Contact Us <ArrowIcon className={classes.icon}/></Link>
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

Card.propTypes = {
    text: PropTypes.object
};

export default Card;