import React, { useEffect, useState } from 'react';
import * as classes from './index.module.css';
import Caret from '@Svg/caret.svg';
import Sort from '@Svg/sort.svg';
import PropTypes from 'prop-types';

const RegionFilter = ({ filters, currentRegion, setCurrentRegion }) => {
  const regionTags = filters.filter(tag => tag.name.startsWith("Region:"));
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(false);
  }, [currentRegion]);

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.tagsTitle} onClick={() => setState(!state)}>
        <Sort className={classes.sortIcon}/>
        <span className={classes.mTitle}>{currentRegion ? currentRegion : 'Region'}</span>
        <Caret className={classes.mIcon} />
      </div>

      <ul
        className={`${classes.filtersContainer} ${
          state ? classes.filtersContainerActive : classes.filtersContainerinactive
        }`}
      >
        <li
          className={`${classes.item} ${currentRegion === '' && classes.itemActive}`}
          onClick={() => setCurrentRegion('')}
        >
          Region
        </li>

        {regionTags.map((tag, index) => (
          <li
            key={index}
            className={`${classes.item} ${currentRegion === tag.name && classes.itemActive}`}
            onClick={() => setCurrentRegion(tag.name)}
          >
            {(tag.name.split(': ').length > 1) ? tag.name.split(': ')[1] : tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

RegionFilter.propTypes = {
  filters: PropTypes.array.isRequired,
  currentRegion: PropTypes.string,
  setCurrentRegion: PropTypes.func.isRequired,
};

export default RegionFilter;
