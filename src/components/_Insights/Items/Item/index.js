import React from 'react';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import Arrow from '@Svg/link-arrow.svg'
import * as classes from './index.module.css';

import { Link } from 'gatsby';

const Item = ({item}) => {
    const {slug, featuredTitle, excerpt, metadata} = item;
    return (
        <Link to={`/insights/${slug}`} className={classes.item}>
            <span className={classes.itemLink} >
                {featuredTitle && <RichText className={classes.itemTitle} content={featuredTitle} useHeadings="Heading 3"/>}
                <Arrow className={classes.arrowIcon}/>
            </span>
            {excerpt && <span className={classes.excerpt}>{excerpt.excerpt}</span>}
            <span className={classes.tags} data-tags="true">
                {metadata.tags
                    .filter(tag => tag.name.startsWith("Article:"))
                    .slice(0, 1)
                    .map((tag, index2) => (
                        <span className={classes.tag} key={index2}>
                        {tag.name.split(": ")[1] || tag.name}
                        </span>
                ))}
            </span>
        </Link>
    );
};

Item.propTypes = {
    
};

export default Item;