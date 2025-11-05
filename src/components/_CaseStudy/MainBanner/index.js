import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import AnimatedText from '@Ui/AnimatedText'

const MainBanner = ({title, excerpt, image, metadata}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'our-work');
    }, []);

    const tags = () => (
        <>
        {metadata.tags
            .filter(tag => tag.name.startsWith("Service:"))
            .slice(0, 1)
            .map((tag, index2) => (
                <span className={classes.tag} key={index2}>
                {tag.name.split(": ")[1] || tag.name}
                </span>
        ))}
        </>
    )
    
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
                    {metadata.tags.length > 0 && <AnimatedText text={tags()} splitType="words" direction="top" className={classes.tags} data-tags="true"/>}
                    {title && <RichText className={classes.title} content={title} useAnimate useHeadings="Heading 1" splitType="lines" direction="right" delay={.2}/>}
                    {excerpt && <AnimatedText className={classes.excerpt} text={excerpt.excerpt} splitType="lines" direction="bottom" delay={.4}/>}
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