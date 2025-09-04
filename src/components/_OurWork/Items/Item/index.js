import React from 'react';
import * as classes from './index.module.css'
import AnimatedImage from '@Ui/AnimatedImage';
import PropTypes from 'prop-types';
import Arrow from '@Svg/link-arrow.svg'
import { Link } from 'gatsby';

const Item = ({item, view, isMega}) => {

    const {slug, title, mainImage, metadata, excerpt} = item;
    return (
        <div className={`${classes.item} ${classes[view]} ${(isMega && view !== 'list') && classes.mega}`}>
            {view !== 'list' &&
                <div className={`${classes.imageContainer} ${view === 'list' ? classes.boxed : isMega ? classes.video : classes.tablet}`}>
                    <AnimatedImage
                        image={mainImage}
                        height={1280}
                        width={1024}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.itemContainer}>
                <Link className={classes.itemLink} to={`/our-work/${slug}`}>
                    <h3 className={classes.itemTitle}>{title}</h3>
                    <Arrow className={`${view === 'grid' ? classes.arrowIcon : classes.arrowIconList} ${(isMega && view !== 'list') && classes.arrowMega}`}/>
                </Link>
                <p className={classes.itemSubTitle}>{excerpt?.excerpt}</p>
                <span className={classes.tags} data-tags="true">
                    {metadata.tags
                        .filter(tag => tag.name.startsWith("Service:"))
                        .slice(0, 1)
                        .map((tag, index2) => (
                            <span className={classes.tag} key={index2}>
                            {tag.name.split(": ")[1] || tag.name}
                            </span>
                    ))}
                </span>
            </div>
        </div>
    );
};

Item.propTypes = {
    
};

export default Item;