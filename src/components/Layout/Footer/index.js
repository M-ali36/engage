import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import * as classes from './index.module.css'
import SubscribeForm from './Subscribe'

const Footer = () => {

	const {
		contentfulFooter: {
			copyrights,
			newsletterMessage,
			socialLinks, 
			detailsLinks
		}
	  } = useStaticQuery(
	    graphql`
	      query {
			contentfulFooter {
				copyrights
				newsletterMessage
				socialLinks {
					title
					url
					icon
				}
				detailsLinks {
					title
					url
					linkType
				}
			}
	      }
	    `
	  )

	return (
		<footer className={classes.footer}>
			<div className={classes.cont}>
				<div className={classes.row}>
					<div className={classes.mainCol}>
						{newsletterMessage && <h2 className={classes.newsletterMessage}>{newsletterMessage}</h2>}
						<SubscribeForm />
					</div>
					<div className={classes.colSpace}></div>
					<div className={classes.col}>
						<h3 className={classes.linksTitle}>Socials</h3>
						<ul className={classes.fastlinks}>
						{socialLinks.map((item, index) => (
							<li><a href={item.url} target="_blank" className={classes.link}>{item.title}</a></li>
						))}
						</ul>
					</div>
					<div className={classes.col}>
						<h3 className={classes.linksTitle}>Details</h3>
						<ul className={classes.fastlinks}>
						{detailsLinks.map((item, index) => (
							<li><Link to={item.url} className={classes.link}>{item.title}</Link></li>
						))}
						</ul>
					</div>
					<div className={classes.logoCol}>
						<span className={classes.footerLogo}>Eng<span className={classes.spiCh}>a</span>ge</span>
						<a href="https://bravebison.com/" target='_blank' className={classes.footerSubTitle}>Part of <strong className={classes.bb}>Br<span className={classes.spiCh}>a</span>veBison</strong></a>
					</div>
				</div>
				<div className={classes.copyrights}>{copyrights}</div>
			</div>
		</footer>
	)
}

export default Footer

Footer.propTypes = {
};