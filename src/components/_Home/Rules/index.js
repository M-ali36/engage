import React from 'react';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const Rules = ({title, subTitle, items}) => {
    return (
        <SectionObserver className={classes.root} isLight>
            <div className={classes.cont}>
                <div className={classes.titleRow}>
                    <div className={classes.titleContainer}>
                        <RichText content={title} useHeadings="Heading 2" className={classes.title}/>
                    </div>
                    <div className={classes.subTitleContainer}>
                        <RichText className={classes.subTitle} content={subTitle}/>
                    </div>
                </div>
                <div className={classes.row}>
                    {items.map((item, index) => (
                        <div className={classes.col} key={index}>
                            {item.image &&
                                <GatsbyImage
                                    image={item.image.gatsbyImageData}
                                    alt={item.image.description}
                                    className={classes.iconContainer}
                                    placeholder="blurred"
                                />
                            }
                            <h3 className={classes.itemTitle}>{item.title}</h3>
                            {item.content && <RichText content={item.content} className={classes.itemContent}/>}
                        </div>
                    ))}
                </div>
            </div>
        </SectionObserver>
    );
};

Rules.propTypes = {
    
};

export default Rules;