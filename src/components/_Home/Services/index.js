import React from 'react';
import * as classes from './index.module.css'
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import RichText from '@components/RichText';
import ArrowIcon from '@Svg/link-arrow.svg'
import { GatsbyImage } from 'gatsby-plugin-image';

const Services = ({title, services}) => {
    return (
        <section className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.subTitle}>Our Services</h2>
                <div className={classes.titleContainer}>
                    <RichText className={classes.title} content={title}/>
                </div>
                <ul className={classes.servicesList}>
                    {services.map((item, index) => (
                        <li key={index} className={classes.serviceItem}>
                            <Link to={`${item.link?.url}`} className={classes.itemCont}>
                                <div className={classes.itemContent}>
                                    <h3 className={classes.itemTitle}>{item.title}</h3>
                                    {item.content && <RichText content={item.content} className={classes.itemSubTitle}/>}
                                </div>
                                <div className={classes.itemImage}>
                                    <div className={classes.imageContainer}>
                                        <GatsbyImage 
                                            image={item.image.gatsbyImageData}
                                            alt={item.image.description}
                                            placeholder="blurred"
                                        />
                                    </div>
                                </div>
                                <div className={classes.iconCol}>
                                    <ArrowIcon className={classes.icon} />
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

Services.propTypes = {
    
};

export default Services;