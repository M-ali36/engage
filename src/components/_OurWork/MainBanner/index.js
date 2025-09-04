import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const MainBanner = ({subTitle}) => {

    const [store, dispatch] = useStore();

    useEffect(() => {
        setCurrentPage(dispatch, 'our-work');
    }, []);
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h1 className={classes.title}>Our Work</h1>
                <RichText content={subTitle} className={classes.subTitle}/>
            </div>
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    text: PropTypes.object
};

export default MainBanner;