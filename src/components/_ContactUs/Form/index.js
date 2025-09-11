import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import HubspotForm from '@components/HubspotForm';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import Instagram from '@Svg/instagram';
import Linkedin from '@Svg/linkedin.svg';
import Envelope from '@Svg/envelope.svg'

const MainBanner = ({title, links}) => {
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.row}>
                    <div className={classes.col}>
                        <ul className={classes.linkList}>
                            {links.map((item, index) => (
                                <li className={classes.item} key={index}>
                                    <a href={item.url} className={classes.itemLink} target="_blank">
                                        {item.icon === 'Instagram' &&
                                            <Instagram className={classes.icon}/>
                                        }
                                        {item.icon === 'Linkedin' &&
                                            <Linkedin className={classes.icon}/>
                                        }
                                        {item.icon === 'Envelope' &&
                                            <Envelope className={classes.icon}/>
                                        }
                                        <span className={classes.linkTitle}>{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.colForm}>
                        {title && <RichText className={classes.title} content={title} useHeadings="Heading 2"/>}
                        <HubspotForm />
                    </div>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

MainBanner.propTypes = {
    text: PropTypes.object
};

export default MainBanner;