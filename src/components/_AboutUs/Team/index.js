import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import AnimatedImage from '@Ui/AnimatedImage';
import Linkedin from "@Svg/linkedin.svg"
import { Link } from 'gatsby';

const Team = ({title, items}) => {

    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.titleContainer}>
                    <h2 className={classes.miniTitle}>Team</h2>
                    <RichText
                    content={title}
                    className={classes.title}
                    />
                </div>
                <div className={classes.row}>
                    {items.map((item, index) => (
                        <div className={classes.itemContainer} key={index}>
                            <div className={classes.imageContainer} key={index}>
                                <AnimatedImage
                                image={item.image}
                                height={1024}
                                width={1024}
                                className={classes.image}
                                />
                            </div>
                            <div className={classes.itemContent}>
                                <h3 className={classes.itemTitle}>{item.title}</h3>
                                <span className={classes.itemRule}>{item.rule}</span>
                                <div className={classes.itemLinks}>
                                    {item.links?.map((link, indexLink) => (
                                        <a href={link.url} key={indexLink} className={classes.itemLink} target="_blank">
                                            {link.icon === 'Linkedin' &&
                                                <Linkedin className={classes.socialIcon}/>
                                            }
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

Team.propTypes = {
    text: PropTypes.object
};

export default Team;