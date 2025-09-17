import React, { useEffect, useRef } from 'react';
import * as classes from './index.module.css'
import AnimatedLink from '@Ui/AnimatedLink'
import RichText from '@components/RichText'
import PropTypes from 'prop-types';
import SectionObserver from '@components/SectionObserver';
import FooterA from '@Svg/footer-a.svg'
import gsap from 'gsap';

const PageFooter = ({footer}) => {
    const {content, link} = footer;
    const svgRef = useRef(null);

    useEffect(() => {
        if (svgRef.current) {
            const paths = svgRef.current.querySelectorAll('path');
            const pathsArray = Array.from(paths);

            // Break into groups of 5
            const groups = [];
            for (let i = 0; i < pathsArray.length; i += 3) {
                groups.push(pathsArray.slice(i, i + 3));
            }

            // Animate each group with stagger between groups
            groups.forEach((group, index) => {
                gsap.to(group, {
                    opacity: 0.3,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.4 // small offset between groups
                });
            });
        }
    }, []);

    return (
        <SectionObserver className={classes.message} isLight>
            <div ref={svgRef}>
                <FooterA className={classes.bgSvg}/>
            </div>
            <div className={classes.messageContainer}>
                <RichText content={content} className={classes.messageContent} />
                {link && (
                    <AnimatedLink 
                        link={`/${link.linkToPage ? link.linkToPage.slug : link.url}`} 
                        title={link.title} 
                        style="secondary"
                    />
                )}
            </div>
        </SectionObserver>
    );
};

PageFooter.propTypes = {
    footer: PropTypes.object
};

export default PageFooter;
