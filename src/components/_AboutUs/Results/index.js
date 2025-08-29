import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const Results = ({title, items}) => {

    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <RichText content={title} className={classes.title} useHeadings="Heading 2"/>
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