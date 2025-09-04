import React from 'react';
import SectionObserver from '@components/SectionObserver';
import PropTypes from 'prop-types';
import * as classes from './index.module.css'
import { Link } from 'gatsby';

const Services = ({ metadata, allServices }) => {
  return (
    <SectionObserver className={classes.root}>
      <div className={classes.cont}>
        <h2 className={classes.title}>Services</h2>
        <div className={classes.tags}>
          {metadata.tags
            .filter(tag => tag.name.startsWith("Service:"))
            .map((tag, index2) => {
              const service = allServices.find(s =>
                s.metadata.tags.some(t => t.contentful_id === tag.contentful_id)
              );

              return (
                <Link 
                  to={service ? `/what-we-do/${service.slug}` : '#'} 
                  key={index2}
                  className={classes.link}
                >
                  <span className={classes.tag}>
                    {tag.name.split(": ")[1] || tag.name}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </SectionObserver>
  );
};

Services.propTypes = {
  metadata: PropTypes.object.isRequired,
  allServices: PropTypes.array.isRequired,
};

export default Services;
