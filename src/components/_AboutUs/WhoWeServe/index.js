import React from 'react';
import SectionObserver from '@components/SectionObserver';
import RichText from '@components/RichText';
import PropTypes from 'prop-types';
import WorldMap from '@Svg/world-map.svg';
import * as classes from './index.module.css';
import Australia from '@Svg/flags/australia.svg';
import India from '@Svg/flags/india.svg';
import USA from '@Svg/flags/usa.svg';
import London from '@Svg/flags/london.svg';

const WhoWeServe = ({ title }) => {

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <div className={classes.titleContainer}>
          <RichText
            content={title}
            className={classes.title}
          />
        </div>
        <div className={classes.map}>
          <WorldMap className="world-map"/>
        </div>
        <ul className={classes.worldList}>
          <li className={classes.item}>
            <USA className={classes.image}/>
            <div className={classes.content}>
              <h3 className={classes.cityTitle}>New York</h3>
              <span className={classes.timeZone}>GMT -5:00</span>
            </div>
          </li>
          <li className={classes.item}>
            <London className={classes.image}/>
            <div className={classes.content}>
              <h3 className={classes.cityTitle}>London</h3>
              <span className={classes.timeZone}>GMT</span>
            </div>
          </li>
          <li className={classes.item}>
            <India className={classes.image}/>
            <div className={classes.content}>
              <h3 className={classes.cityTitle}>Bangalore</h3>
              <span className={classes.timeZone}>GMT+5:30</span>
            </div>
          </li>
          <li className={classes.item}>
            <Australia className={classes.image}/>
            <div className={classes.content}>
              <h3 className={classes.cityTitle}>Melbourne</h3>
              <span className={classes.timeZone}>GMT +11:00</span>
            </div>
          </li>
        </ul>
      </div>
    </SectionObserver>
  );
};

WhoWeServe.propTypes = {
  title: PropTypes.object
};

export default WhoWeServe;
