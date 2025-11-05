import React, {useState, useEffect} from 'react'
import * as classes from './index.module.css'
import PropTypes from 'prop-types'
import Logos from "@Svg/logo.svg";
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
				<h1 className={classes.title}>Eng<span className={classes.sChr}>a</span>ge</h1>
			}
			{(location?.pathname !== '/') &&
				<Link to={`/`} title="Greatsweb">
					<span className={classes.title}>Eng<span className={classes.sChr}>a</span>ge</span>
				</Link>
			}
		</div>
	)
}

export default Logo

Logo.propTypes = {
  location: PropTypes.object
};