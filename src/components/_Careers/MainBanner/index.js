import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import AnimatedText from '@Ui/AnimatedText'

const MainBanner = ({title, image, subTitle}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'contact-us');
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
                    {title && <RichText className={classes.title} content={title} useHeadings="Heading 1" useAnimate splitType="lines"/>}
                    {subTitle && <AnimatedText className={classes.subTitle} text={subTitle} splitType="lines" direction="bottom" delay={0.2}/>}
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