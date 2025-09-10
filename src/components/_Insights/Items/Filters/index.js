import React from 'react';
import * as classes from './index.module.css'
import PropTypes from 'prop-types';
import Arrow from '@Svg/caret.svg'

const Filters = ({ allTags, currentFilter, setCurrentFilter }) => {
    return (
        <>
        <div className={classes.mobileFilter}>
            <select
                className={classes.select}
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value)}
            >
                <option value="All">All</option>
                {allTags.map(tag => (
                    <option key={tag.contentful_id} value={tag.name}>
                        {(tag.name.split(': ').length > 1) ? tag.name.split(': ')[1] : tag.name}
                    </option>
                ))}
            </select>
            <Arrow className={classes.selectArrow}/>
        </div>
        <div className={classes.filtersContainer}>
            <button onClick={() => setCurrentFilter('All')} className={`${classes.filterBtn} ${currentFilter === 'All' ? classes.active : classes.notActive}`}>
                All
            </button>
            {allTags.map(tag => (
                <button 
                    key={tag.contentful_id} 
                    onClick={() => setCurrentFilter(tag.name)} 
                    className={`${classes.filterBtn} ${currentFilter === tag.name ? classes.active : classes.notActive}`}
                >
                    {(tag.name.split(': ').length > 1) ? tag.name.split(': ')[1] : tag.name}
                </button>
            ))}
        </div>
        </>
    );
};

Filters.propTypes = {
    allTags: PropTypes.array,
    currentFilter: PropTypes.string,
    setCurrentFilter: PropTypes.func
};

export default Filters;
