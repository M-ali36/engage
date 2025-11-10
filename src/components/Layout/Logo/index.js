import React, {useState, useEffect} from 'react'
import * as classes from './index.module.css'
import PropTypes from 'prop-types'
import Logos from "@Svg/engage-logo.svg";
import { Link } from 'gatsby'

const Logo = ({location}) => {
	const data = {
		url: '/',
		title: ''
	}
	const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);
	return (
		<div className={classes.logo}>
			{(location?.pathname === '/') &&
				<Logos className={`${classes.svg} animated-logo`}/>
			}
			{(location?.pathname !== '/') &&
				<Link to={`/`} title="Greatsweb" className={classes.title}>
					<Logos className={`${classes.svg} animated-logo`}/>
				</Link>
			}
		</div>
	)
}

export default Logo

Logo.propTypes = {
  location: PropTypes.object
};