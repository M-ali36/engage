import React, { useState } from 'react';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Partners = ({title, items}) => {

    const [show, setShow] = useState(false);
    return (
        <SectionObserver className={classes.root} isLight>
            <div className={classes.cont}>
                <h2 className={classes.subTitle}>Partners</h2>
                <div className={classes.titleContainer}>
                    <RichText className={classes.title} content={title}/>
                </div>
                <div className={`${classes.row} ${!show && classes.hideElements}`}>
                    {items.map((item, index) => (
                        <div className={classes.itemContainer} key={index}>
                            <GatsbyImage
                                image={item.gatsbyImageData}
                                alt={item.description}
                                className={classes.image}
                                placeholder="blurred"
                            />
                        </div>
                    ))}
                </div>
                <button type="button" className={classes.btnShow} onClick={() => setShow(!show)}>Show more</button>
            </div>
        </SectionObserver>
    );
};

Partners.propTypes = {
    
};

export default Partners;