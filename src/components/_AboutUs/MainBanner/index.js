import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import VGallery from '@components/VGallery';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const MainBanner = ({title, subTitle,images}) => {

    const [store, dispatch] = useStore();

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
                            <RichText className={classes.title} content={title} useHeadings="Heading 1" useAnimate splitType="lines" direction="right"/>
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