import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const Results = ({data }) => {
    const {items} = data
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.title}>Results</h2>
                <div className={classes.row}>
                    {items.map((item, index) => (
                        <div className={classes.itemContainer} key={index}>
                            <RichText content={item.content} className={classes.itemTitle}/>
                        </div>
                    ))}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

Results.propTypes = {
    text: PropTypes.object
};

export default Results;