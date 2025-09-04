import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const MainBanner = ({title, excerpt, image, metadata}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'our-work');
    }, []);
    
    return (
        <>
        <SectionObserver className={classes.root}>
            {image && 
                <div className={classes.imageContainer}>
                    <AnimatedImage
                        image={image}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.cont}>
                <div className={classes.contentContainer}>
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
                    {title && <RichText className={classes.title} content={title} useHeadings="Heading 1"/>}
                    {excerpt && <span className={classes.excerpt}>{excerpt.excerpt}</span>}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    text: PropTypes.object
};

export default MainBanner;