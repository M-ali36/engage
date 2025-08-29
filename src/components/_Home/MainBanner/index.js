import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import PropTypes from 'prop-types';
import BannerVideo from '@Ui/BannerVideo';
import * as classes from './index.module.css'
import SectionObserver from '@components/SectionObserver';

const MainBanner = ({video, image}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'home');
    }, []);
    
    return (
        <>
        <SectionObserver className={classes.root}>
            {video && <BannerVideo url={video.file.url} image={image}/>}
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    video: PropTypes.object,
    text: PropTypes.object
};

export default MainBanner;