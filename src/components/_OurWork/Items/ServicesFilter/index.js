import React, { useEffect, useState } from 'react';
import * as classes from './index.module.css'
import Caret from '@Svg/caret.svg'
import PropTypes from 'prop-types';

const ServicesFilter = ({filters, currentFilter, setCurrentFilter}) => {
    const categoryTags = filters.filter(tag => tag.name.startsWith("Service:"));
    const [state, setState] = useState(false);

    useEffect(() => {
        setState(false);
    }, [currentFilter]);

    return (
        <div className={classes.filtersWrapper}>
            <div className={classes.tagsTitle} onClick={() => setState(!state)}>
                <span className={classes.dTitle}>Services</span> 
                <span className={classes.mTitle}>{currentFilter ? currentFilter : 'All Services'}</span>
                <Caret className={classes.mIcon} />
            </div>

            <ul className={`${classes.filtersContainer} ${state ? classes.filtersContainerActive : classes.filtersContainerinactive}`}>
                {categoryTags.map((tag, index) => (
                    <li key={index} className={`${classes.item} ${currentFilter === tag.name && classes.itemActive}`} onClick={() => setCurrentFilter(tag.name)}>
                        {(tag.name.split(': ').length > 1) ? tag.name.split(': ')[1] : tag.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ServicesFilter.propTypes = {
    
};

export default ServicesFilter;