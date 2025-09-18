import React from 'react';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import { Link } from 'gatsby';

const NextArticle = ({data}) => {
    const {title, excerpt, mainImage, mainBanner, metadata, slug} = data;
    return (
        <>
        <SectionObserver className={classes.root}>
            {(mainBanner || mainImage) && 
                <div className={classes.bgImageContainer}>
                    <AnimatedImage
                        image={mainBanner ? mainBanner : mainImage}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.colImage}>
                        <h2 className={classes.mainTitle}>Next Article</h2>
                        <div className={classes.imageContainer}>
                            <AnimatedImage
                                image={mainImage}
                                height={1280}
                                width={1024}
                                className={classes.image}
                            />
                        </div>
                    </div>
                    <div className={classes.colContent}>
                        <div className={classes.contentContainer}>
                            {title && <h3 className={classes.title}>{title}</h3>}
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
                        </div>
                    </div>
                    <div className={classes.colLink}>
                        <Link to={`/insights/${slug}`} className={classes.nextLink}>View Article</Link>
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

NextArticle.propTypes = {
    text: PropTypes.object
};

export default NextArticle;