import React, { useRef, useState, useEffect } from 'react';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import Item from './Item';
import ServicesFilter from './ServicesFilter';
import SearchIcon from "@Svg/search.svg";
import Caret from "@Svg/caret.svg";

const Items = ({ items, tags }) => {
  const [view, setView] = useState('grid');
  const [filteredItems, setFilteredItems] = useState(items);
  const [currentFilter, setCurrentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const searchRef = useRef();

  useEffect(() => {
    let filtered = items;

    if (currentFilter !== '') {
      filtered = filtered.filter(item =>
        item.metadata.tags.some(tag => tag.name === currentFilter)
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1);

    const queryParams = new URLSearchParams();
    if (currentFilter !== '') queryParams.set('service', currentFilter);
    if (searchTerm !== '') queryParams.set('search', searchTerm);

    if (queryParams.toString()) {
      window.history.replaceState(null, '', `${window.location.pathname}?${queryParams.toString()}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [currentFilter, searchTerm, items]);

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.mainRow}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <input
                type="search"
                ref={searchRef}
                className={classes.input}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className={classes.searchIcon} />
            </div>
            <div className={classes.viewBtns}>
              <div className={classes.btnViewContainer}>
                <button
                  className={`${classes.btnView} ${view === 'grid' && classes.btnActive}`}
                  onClick={() => setView('grid')}
                >
                  Grid
                </button>
                <button
                  className={`${classes.btnView} ${view === 'list' && classes.btnActive}`}
                  onClick={() => setView('list')}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          <div className={classes.filtersCol}>
            <ServicesFilter
              filters={tags}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          </div>

          <div className={classes.itemsCol}>
            <div className={classes.row}>
              {currentItems.length > 0 ? (
                <>
                  {currentItems.map((item, index) => (
                    <Item
                      item={item}
                      isMega={index === 0}
                      view={view}
                      key={index}
                    />
                  ))}
                </>
              ) : (
                <div className={classes.empty}>There are no items</div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className={classes.pagination}>
          <div className={classes.totals}>
            Page {currentPage} of {totalPages}
          </div>
          <div className={classes.pagesBtns}>
            <button
              disabled={currentPage === 1}
              className={classes.btnPage}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <Caret className={`${classes.arrowIcon}`} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`${classes.btnPage}${currentPage === i + 1 ? classes.activePage : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              className={classes.btnPage}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <Caret className={`${classes.arrowIcon} ${classes.iconNext}`} />
            </button>
          </div>
          <div className={classes.perPage}>
            <label>
              <select
                value={itemsPerPage}
                className={classes.perPageSelect}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={7}>7 / page</option>
                <option value={14}>14 / page</option>
                <option value={21}>21 / page</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </SectionObserver>
  );
};

Items.propTypes = {
  text: PropTypes.object
};

export default Items;
