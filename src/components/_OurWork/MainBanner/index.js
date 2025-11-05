import React, {useEffect, useRef} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import AnimatedText from '@Ui/AnimatedText'

const MainBanner = ({subTitle}) => {

    const [store, dispatch] = useStore();
    const mainRef = useRef();

    useEffect(() => {
        setCurrentPage(dispatch, 'our-work');
    }, []);
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h1 className={classes.title} ref={mainRef}>
                    <AnimatedText text="Our Work" splitType="words" direction="right" ref={mainRef}/>
                </h1>
                <RichText content={subTitle} className={classes.subTitle} useAnimate splitType="lines" direction="bottom" delay={0.2}/>
            </div>
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    text: PropTypes.object
};

export default MainBanner;