import React, { useRef, useState, useEffect, useRef as useRefHook } from 'react';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import Item from './Item';
import ServicesFilter from './ServicesFilter';
import RegionFilter from './RegionFilter';
import SearchIcon from "@Svg/search.svg";
import Caret from "@Svg/caret.svg";
import Arrow from "@Svg/link-arrow.svg";

const Items = ({ items, tags }) => {
  const [view, setView] = useState('grid');
  const [filteredItems, setFilteredItems] = useState(items);
  const [currentService, setCurrentService] = useState('');
  const [currentRegion, setCurrentRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const searchRef = useRef();

  const isInitialMount = useRefHook(true);

  // ✅ Initialize from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') || '';
    const region = params.get('region') || '';
    const search = params.get('search') || '';
    const pageParam = parseInt(params.get('page') || '1', 10);

    setCurrentService(service);
    setCurrentRegion(region);
    setSearchTerm(search);
    if (!isNaN(pageParam) && pageParam > 0) {
      setCurrentPage(pageParam);
    }
  }, []);

  // ✅ Filtering logic (preserves ?page on mount)
  useEffect(() => {
    let filtered = items;

    if (currentService !== '') {
      filtered = filtered.filter(item =>
        item.metadata.tags.some(tag => tag.name === currentService)
      );
    }

    if (currentRegion !== '') {
      filtered = filtered.filter(item =>
        item.metadata.tags.some(tag => tag.name === currentRegion)
      );
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);

    // ✅ Only reset page and update URL after initial mount
    if (!isInitialMount.current) {
      setCurrentPage(1);
    }

    const queryParams = new URLSearchParams(window.location.search);

    if (currentService !== '') queryParams.set('service', currentService);
    else queryParams.delete('service');

    if (currentRegion !== '') queryParams.set('region', currentRegion);
    else queryParams.delete('region');

    if (searchTerm !== '') queryParams.set('search', searchTerm);
    else queryParams.delete('search');

    // keep page param if it exists (don't delete it on first load)
    const query = queryParams.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [currentService, currentRegion, searchTerm, items]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ Update ?page= param when page changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (currentPage > 1) {
      params.set('page', currentPage);
    } else {
      params.delete('page');
    }

    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);

    // mark initial mount complete after URL sync
    isInitialMount.current = false;
  }, [currentPage]);

  // ✅ Pagination navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // instant scroll to top on page change
    }
  };

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.mainRow}>
          {/* Controls */}
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

          {/* Filters */}
          <div className={classes.filtersCol}>
            <ServicesFilter
              filters={tags}
              currentFilter={currentService}
              setCurrentFilter={setCurrentService}
            />
            <RegionFilter
              filters={tags}
              currentRegion={currentRegion}
              setCurrentRegion={setCurrentRegion}
            />
          </div>

          {/* Items */}
          <div className={classes.itemsCol}>
            <div className={classes.row}>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <Item
                    item={item}
                    isMega={index === 0}
                    view={view}
                    key={index}
                  />
                ))
              ) : (
                <div className={classes.empty}>There are no items</div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={classes.pagination}>
            <div className={classes.totals}>
              Page {currentPage} of {totalPages}
            </div>

            <div className={classes.pagesBtns}>
              <button
                disabled={currentPage === 1}
                className={classes.btnPage}
                onClick={() => goToPage(currentPage - 1)}
              >
                <Caret className={`${classes.arrowIcon}`} />
                <Arrow className={`${classes.arrowIconM} ${classes.iconPrevM}`}/>
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`${classes.btnPage} ${classes.numBtn} ${
                    currentPage === i + 1 ? classes.activePage : ''
                  }`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <div className={classes.totalsMob}>
                Page {currentPage} of {totalPages}
              </div>

              <button
                disabled={currentPage === totalPages}
                className={classes.btnPage}
                onClick={() => goToPage(currentPage + 1)}
              >
                <Caret className={`${classes.arrowIcon} ${classes.iconNext}`} />
                <Arrow className={`${classes.arrowIconM} ${classes.iconNextM}`}/>
              </button>
            </div>

            <div className={classes.perPage}>
              <span className={classes.selectContainer}>
                <select
                  value={itemsPerPage}
                  className={classes.perPageSelect}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={7}>7 / page</option>
                  <option value={15}>15 / page</option>
                  <option value={21}>21 / page</option>
                </select>
              </span>
            </div>
          </div>
        )}
      </div>
    </SectionObserver>
  );
};

Items.propTypes = {
  items: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default Items;
