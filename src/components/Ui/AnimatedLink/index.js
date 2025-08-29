import React from 'react';
import * as classes from './index.module.css'
import { Link } from 'gatsby';
import { useSplitText } from '@UseCase/useSplitText';
import Arrow from '@Svg/arrow.svg'
import PropTypes from 'prop-types';

const AnimatedLink = ({
    as = "internal",
    link = "/",
    style = "primary",
    title,
    arrow,
    children,
    hoverStyle,
    small = false,
    ...props
}) => {

    const content = (
        <>
            <span className={classes.textWrapper}>
                <span className={classes.mainText}>{useSplitText(title)}</span>
                <span className={classes.secondaryText} aria-hidden="true">{useSplitText(title)}</span>
            </span>
            {children}
            {arrow && <Arrow className={classes.icon}/>}
        </>
    )
    return (
        <>
            {as === "internal" &&
                <Link to={link} {...props} className={`${classes.btn} ${classes[style]} ${hoverStyle ? classes[hoverStyle] : ''} ${small ? classes.small : classes.big}`}>
                    {content}
                </Link>
            }
            {as === "external" &&
                <a href={link} {...props} className={`${classes.btn} ${classes[style]} ${hoverStyle ? classes[hoverStyle] : ''} ${small ? classes.small : classes.big}`} target="_blank" rel="noreferrer">
                    {content}
                </a>
            }
            {as === "button" &&
                <button {...props} className={`${classes.btn} ${classes[style]} ${hoverStyle ? classes[hoverStyle] : ''} ${small ? classes.small : classes.big}`}>
                    {content}
                </button>
            }
        </>
    );
};

AnimatedLink.propTypes = {
    as: PropTypes.string,
    link: PropTypes.string,
    style: PropTypes.string,
    title: PropTypes.string,
    arrow: PropTypes.bool
};

export default AnimatedLink;