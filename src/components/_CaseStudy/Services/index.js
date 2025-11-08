import React from 'react';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';
import * as classes from './index.module.css';
import { Link } from 'gatsby';

const Services = ({ metadata }) => {
  const tags = metadata?.tags || [];

  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <h2 className={classes.title}>Services</h2>
        <div className={classes.tags}>
          {tags.map((tag, index) => {
            const tagName = tag.name?.split(': ')[1] || tag.name || '';

            return (
              <Link
                to={`/our-work/?${(tag.name?.split(': ')[0] === 'Service') ? 'service' : 'region'}=${encodeURIComponent(tag.name).replace(/%20/g, '+')}`}
                key={index}
                className={classes.link}
              >
                <span className={classes.tag}>{tagName}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </SectionObserver>
  );
};

Services.propTypes = {
  metadata: PropTypes.object,
};

export default Services;
