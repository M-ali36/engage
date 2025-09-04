import React, {useEffect} from 'react';
import { useStore, setCurrentPage } from '@UseCase/store';
import SectionObserver from '@components/SectionObserver';
import AnimatedImage from '@Ui/AnimatedImage';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'

const SideBySide = ({data}) => {
    const {title, content, backgroundColor, textColor, image} = data;
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
                <div className={classes.row}>
                    <div className={classes.col}>
                        <h2 className={classes.title}>{title}</h2>
                        {content && <RichText className={`${classes.content} ${toCamelCase(textColor, 'text')}`} content={content}/>}
                    </div>
                    <div className={classes.col}>
                        {image && 
                            <div className={classes.imageContainer}>
                                <AnimatedImage
                                    image={image}
                                    height={1280}
                                    width={1024}
                                    className={classes.image}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

SideBySide.propTypes = {
    data: PropTypes.object
};

export default SideBySide;