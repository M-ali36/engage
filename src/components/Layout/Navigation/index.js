import React, {useState, useEffect} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import * as classes from './index.module.css'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Menu from '@Svg/menu.svg'
import XIcon from '@Svg/x.svg'
import Logo from "@Svg/logo.svg";
import Linkedin from "@Svg/linkedin.svg";
import Instagram from "@Svg/instagram.svg";
import Threads from "@Svg/threads.svg";
import X from "@Svg/x-twitter.svg";
import Tiktok from "@Svg/tiktok.svg";
import {useStore, setNavState} from '@UseCase/store'

const Navigation = ({location}) => {

	const {
    contentfulGlobalConfigurations: { socialLinks }
  } = useStaticQuery(
    graphql`
      query {
        contentfulGlobalConfigurations {
			    socialLinks {
			      title
			      url
			      icon
			    }
			  }
      }
    `
  )

	const [store , dispatch] = useStore();
	const {navOpenState} = store;
	const toggleClass = navOpenState === 'nav' ? classes.navOpend : classes.nav;

	const navigation = [
		{
			url: '/about-us',
			title: 'About Us'
		},
		{
			url: '#',
			title: 'Careers'
		},
		{
			url: '/our-work',
			title: 'Our Work'
		},
		{
			url: '/insights',
			title: 'Insights'
		},
		{
			url: '#',
			title: 'Contact Us'
		}
	]

	const setState = () => {
		if(navOpenState === 'nav') {
			setNavState( dispatch, '');
		}else {
			setNavState(dispatch, 'nav');
		}
	}

    useEffect(() => {
        setNavState(dispatch, '');
    }, [location, dispatch]);


	return (
		<>
			<button className={classes.toggle} onClick={setState} title="Main menu" aria-label='Main menu'>{navOpenState === 'nav' ? <XIcon className={classes.menuIcon}/> : <Menu className={classes.menuIcon}/>}</button>
			<nav className={toggleClass}>
				<ul className={classes.linksList}>
					{navigation && navigation.map((item, index) => (
						<li className={classes.navItem} key={index} data-item="">
							<Link to={item.url} className={classes.link} title={item.title}>{item.title}</Link>
						</li>
					))}
				</ul>
			</nav>

		</>
	)
}

export default Navigation

Navigation.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.object),
  linkedinUrl: String,
  instagramUrl: String,
  tiktokUrl: String,
  threadsUrl: String
};