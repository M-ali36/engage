import React from "react"
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import BannerVideo from '@Ui/BannerVideo'
import PropTypes from 'prop-types'
import TextRotator from "@components/_Home/TextRotator"
import Rules from "../components/_Home/Rules"
import Services from "../components/_Home/Services"
import Insights from "../components/Insights"
import Partners from "../components/Partners"

const IndexPage = ({ data }) => {

	const {
		seo,
		mainVideoId,
		mainInfoList,
		mainInfoImage,
		theRulesTitle,
		theRulesSubTitle,
		theRulesList,
		servicesTitle,
		services,
		insightsTitle,
		insights,
		partnersTitle,
		partners,
		mainVideoPlaceholder
	} = data.contentfulHomePage;

	return (
		<>
			<Seo data={seo} slug="/" />
			<BannerVideo videoId={mainVideoId} image={mainVideoPlaceholder}/>
			<TextRotator image={mainInfoImage} list={mainInfoList} />
			<Rules title={theRulesTitle} subTitle={theRulesSubTitle} items={theRulesList}/>
			<Services title={servicesTitle} services={services}/>
			<Insights title={insightsTitle} items={insights}/>
			<Partners title={partnersTitle} items={partners}/>
		</>
	)
}

export default IndexPage

IndexPage.propTypes = {
	data: PropTypes.object
};


export const pageQuery = graphql`
	query HomePage {
		contentfulHomePage(slug: { eq: "home" }) {
			seo {
				...SEO
			}
			mainVideoId
			mainVideoPlaceholder {
				...Image
			}
			mainInfoList
			mainInfoImage {
				...Image
			}
			theRulesTitle {
				raw
			}
			theRulesSubTitle {
				raw
			}
			theRulesList {
				title
				content {
					raw
				}
			}
			servicesTitle {
				raw
			}
			services {
				title
				slug
				mainImage {
					...Image
				}
				homeExcerpt {
					homeExcerpt
				}
			}
			insightsTitle {
				raw
			}
			insights {
				featuredTitle {
					raw
				}
				title
				slug
				mainImage {
					...Image
				}
				date
				excerpt {
					excerpt
				}
				author {
					title
					image {
						...Image
					}
				}
			}
			partnersTitle {
				raw
			}
			partners {
				...Image
			}
			
		}
	}
`