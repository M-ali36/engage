import React, {useEffect, useRef} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import VGallery from '@components/VGallery';
import Logo from '@Svg/engage-logo.svg'
import PropTypes from 'prop-types';
import AnimatedText from '@Ui/AnimatedText'
import * as classes from './index.module.css'

const MainBanner = ({title, subTitle,images}) => {

    const [store, dispatch] = useStore();
    const mainRef = useRef();

    useEffect(() => {
        setCurrentPage(dispatch, 'about-us');
    }, []);
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.contentCol}>
                        <div className={classes.contentContainer}>
                            <h1 className={classes.title}>
                                <AnimatedText text={`We are `} splitType="words" direction="right" ref={mainRef}/>
                                <AnimatedText text={<Logo className={`${classes.svg} animated-logo`}/>} splitType="combo" direction="right" ref={mainRef} delay={0.2}/>
                            </h1>
                            <span className={classes.subContainer}>
                                <RichText className={classes.subTitle} content={subTitle} useAnimate splitType="lines" direction="bottom" delay={0.5}/>
                            </span>
                        </div>
                    </div>
                    <div className={classes.imagesCol}>
                        <VGallery gallery={images}/>
                    </div>
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