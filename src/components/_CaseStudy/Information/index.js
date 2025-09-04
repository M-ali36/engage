import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const Information = ({data}) => {
    const {title, content, backgroundColor, textColor} = data;
    function toCamelCase(str, type) {
        if (typeof str !== 'string' || str.trim() === '') {
            return '';
        }

        const camelCasedString = str
            .split(/[\s_-]+/)
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join('');

        return `${type}-${camelCasedString}`;
    }

    return (
        <>
        <SectionObserver className={`${classes.root} ${toCamelCase(backgroundColor, 'bg')} ${toCamelCase(textColor, 'text')}`}>
            <div className={classes.cont}>
                <h2 className={classes.title}>{title}</h2>
                {content && <RichText className={`${classes.content} ${toCamelCase(textColor, 'text')}`} content={content}/>}
            </div>
        </SectionObserver>
        </>
    );
};

Information.propTypes = {
    data: PropTypes.object
};

export default Information;