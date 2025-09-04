import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import { Link } from 'gatsby';

const NextCaseStudy = ({data}) => {
    const {title, excerpt, mainImage, bannerImage, metadata, slug} = data;
    return (
        <>
        <SectionObserver className={classes.root}>
            {(bannerImage || mainImage) && 
                <div className={classes.bgImageContainer}>
                    <AnimatedImage
                        image={bannerImage ? bannerImage : mainImage}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.colImage}>
                        <h2 className={classes.mainTitle}>Next Case Study</h2>
                        <div className={classes.imageContainer}>
                            <AnimatedImage
                                image={bannerImage ? bannerImage : mainImage}
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
                    <div className={classes.colLink}>
                        <Link to={`/our-work/${slug}`} className={classes.nextLink}>View Case Study</Link>
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

NextCaseStudy.propTypes = {
    text: PropTypes.object
};

export default NextCaseStudy;