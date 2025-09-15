import React from 'react';
import * as classes from './index.module.css'
import AnimatedLink from '@Ui/AnimatedLink'
import AnimatedImage from '@Ui/AnimatedImage'
import RichText from '@components/RichText'
import PropTypes from 'prop-types';
import SectionObserver from '@components/SectionObserver';

const PageFooter = ({footer}) => {
    const {content, link, backgroundImage, mobileBackgroundImage} = footer;
    console.log(footer)
    return (
        <SectionObserver className={classes.message} isLight>
            {backgroundImage &&
                <div className={`${classes.imageContainer} ${classes.desktopBackgroundImage}`}>
                    <AnimatedImage
                        image={backgroundImage}
                        height={1920}
                        width={1080}
                        className={classes.image}
                    />
                </div>
            }
            {mobileBackgroundImage &&
                <div className={classes.mobileBackgroundImage}>
                    <AnimatedImage
                        image={mobileBackgroundImage}
                        height={1024}
                        width={1024}
                        className={classes.image}
                    />
                </div>
            }
            <div className={classes.messageContainer}>
                <RichText content={content} className={classes.messageContent} />
                {link && <AnimatedLink link={`/${link.linkToPage ? link.linkToPage.slug : link.url}`} title={link.title} style="secondary"></AnimatedLink>}
            </div>
        </SectionObserver>
    );
};

PageFooter.propTypes = {
    footer: PropTypes.object
};

export default PageFooter;