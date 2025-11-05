import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import AnimatedText from '@Ui/AnimatedText'

const MainBanner = ({title, image, allTags, subTitle}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'insights');
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
                    {title && <RichText className={classes.title} content={title} useHeadings="Heading 1" useAnimate splitType="lines" direction="right"/>}
                    {subTitle && <AnimatedText as="span" className={classes.subTitle} text={subTitle} splitType="lines" direction="bottom" delay={0.2}/>}
                    <AnimatedText className={classes.tags} text={allTags} as="span" splitType="lines" direction="bottom" delay={0.4}/>
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