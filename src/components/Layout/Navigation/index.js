import React, { useEffect} from 'react'
import * as classes from './index.module.css'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Menu from '@Svg/menu.svg'
import XIcon from '@Svg/x.svg'
import {useStore, setNavState} from '@UseCase/store'

const Navigation = ({location}) => {

	const [store , dispatch] = useStore();
	const {navOpenState} = store;
	const toggleClass = navOpenState === 'nav' ? classes.navOpend : classes.nav;

	const navigation = [
		{
			url: '/about-us',
			title: 'About Us'
		},
		{
			url: '/careers',
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
			url: '/contact-us',
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
	
};