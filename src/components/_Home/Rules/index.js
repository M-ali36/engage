import React from 'react';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import HeartIcon from '@Svg/heart.svg'
import PropTypes from 'prop-types';

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
                        <div className={classes.col}>
                            <span className={classes.iconContainer}>
                                <HeartIcon className={classes.icon}/>
                            </span>
                            <h3 className={classes.itemTitle}>{item.title}</h3>
                            <RichText content={item.content} className={classes.itemContent}/>
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