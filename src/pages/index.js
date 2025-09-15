import React from "react"
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import BannerVideo from '@Ui/BannerVideo'
import Video from '@Ui/Video'
import PropTypes from 'prop-types'
import TextRotator from "@components/_Home/TextRotator"
import Rules from "@components/_Home/Rules"
import Services from "@components/_Home/Services"
import Insights from "@components/Insights"
import Partners from "@components/Partners"
import PageFooter from "@components/PageFooter"

const IndexPage = ({ data }) => {

	const {
		seo,
		mainVideoId,
		mainVideo,
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
		mainVideoPlaceholder,
		pageFooter
	} = data.contentfulHomePage;

	return (
		<>
			<Seo data={seo} slug="/" />
			<Video src={mainVideo} image={mainVideoPlaceholder}/>
			<TextRotator image={mainInfoImage} list={mainInfoList} />
			<Rules title={theRulesTitle} subTitle={theRulesSubTitle} items={theRulesList}/>
			<Services title={servicesTitle} services={services}/>
			<Insights title={insightsTitle} items={insights}/>
			<Partners title={partnersTitle} items={partners}/>
			{pageFooter && <PageFooter footer={pageFooter}/>}
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
			mainVideo {
				...Image
			}
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
				image {
					...Image
				}
			}
			servicesTitle {
				raw
			}
			services {
				title
				content {
					raw
				}
				image {
					...Image
				}
				link {
					...Link
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
			pageFooter {
				content {
					raw
				}
				link {
					...Link
				}
				backgroundImage {
					...Image
				}
				mobileBackgroundImage {
					...Image
				}
			}
		}
	}
`