import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const Content = ({content}) => {
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.content}>
                    <RichText content={content}/>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

Content.propTypes = {
    text: PropTypes.object
};

export default Content;