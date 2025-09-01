import React from 'react'
import Logo from '@Layout/Logo'
import Navigation from '@Layout/Navigation'
import * as classes from './index.module.css'
import RichText from '@components/RichText'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Header = React.forwardRef(({ location }, ref) => {
	const {
			contentfulGlobalConfigurations: {
				headerMessage
			}
		  } = useStaticQuery(
			graphql`
			  query {
				contentfulGlobalConfigurations {
					headerMessage {
						raw
					}
				}
			  }
			`
		  )
	

	return (
		<header className={classes.root} ref={ref}>
			<div className={classes.header}>
				<div className={classes.cont}>
					<div className={classes.row}>
						<div className={classes.logoContainer}>
							<Logo location={location}/>
						</div>
						<div className={classes.navContainer}>
							<Navigation location={location}/>
						</div>
					</div>
				</div>
				{headerMessage &&
					<div className={classes.headerMessage}>
						<div className={classes.cont}>
						<RichText content={headerMessage} className={classes.messageTitle}/>
						</div>
					</div>
				}
			</div>
		</header>
	)
});

export default Header

Header.propTypes = {
  location: PropTypes.object
};