import React, {useState, useEffect} from 'react';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import Item from './Item';
import Filters from './Filters';

const Items = ({items, allTags}) => {

    const [currentFilter, setCurrentFilter] = useState('All');

    const changeFilter = (tag) => {
        setCurrentFilter(tag);
    }

    // Filter articles based on the current filter
    const filteredArticles = items.filter(article => {
        if (currentFilter === 'All') return true;
        return article.metadata.tags.some(tag => tag.name === currentFilter);
    });

    return (
        <>
        <SectionObserver className={classes.root}>
            <div className={classes.cont}>
                <div className={classes.filtersContainer}>
                    <Filters allTags={allTags} currentFilter={currentFilter} setCurrentFilter={changeFilter} />
                </div>
                <div className={classes.itemsContainer}>
                    {filteredArticles?.map((item, index) => (
                        <Item item={item} key={index}/>
                    ))}
                </div>
            </div>
        </SectionObserver>
        </>
    );
};

Items.propTypes = {
    items: PropTypes.array
};

export default Items;