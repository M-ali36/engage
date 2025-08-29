import React, {useEffect, useRef} from 'react';
import * as classes from './index.module.css'
import { useStore, setCurrentPage } from '@UseCase/store';
import AnimatedImage from '@Ui/AnimatedImage';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';

const MainBanner = ({mainBanner}) => {
    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'about');
    }, []);

    return (
        <SectionObserver className={classes.root} isLight>
            <div className={classes.imageWrapper}>
                <AnimatedImage 
                    image={mainBanner}
                    height={1080}
                    width={1920}
                    loading="eager"
                    className={classes.image}
                />
            </div>
        </SectionObserver>
    );
};

MainBanner.propTypes = {
    mainBanner: PropTypes.object
};

export default MainBanner;