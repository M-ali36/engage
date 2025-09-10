import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import Arrow from '@Svg/link-arrow.svg'
import * as classes from './index.module.css'

import { Link } from 'gatsby';

const OpenRoles = ({items, awareness}) => {
    
    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <h2 className={classes.title}>Open Roles</h2>
                <ul className={classes.roles}>
                    {items.map((item, index) => (
                        <li className={classes.item} key={index}>
                            <a className={classes.itemLink} href={item.url} target="_blank">
                                <div className={classes.colTitle}>{item.title}</div>
                                <div className={classes.colLocation}>{item.location}</div>
                                <div className={classes.col}><Arrow className={classes.icon}/></div>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className={classes.awareness}>
                    <RichText className={classes.content} content={awareness}/>
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

OpenRoles.propTypes = {
    text: PropTypes.object
};

export default OpenRoles;