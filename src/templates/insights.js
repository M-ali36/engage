import React from 'react'
import { graphql } from 'gatsby'
import MainBanner from '@components/_Insights/MainBanner'
import Seo from '@components/Seo'
import Slider from '../components/_Insights/Slider'
import Tiktok from '../components/_Insights/Tiktok'
import Items from '../components/_Insights/Items'
import PageFooter from "@components/PageFooter"

const InsightsPage = ({ data }) => {
  const {
    seo,
    slug,
    formattedTitle,
    mainBanner,
    hotArticlesTitle,
    hotArticles,
    subTitle,
    tiktokVideos,
    tiktokTitle,
    pageFooter
  } = data.contentfulInsights

  const allTags = data.allContentfulTag.nodes
  const allArticles = data.allContentfulArticle.nodes

  return (
    <>
      <Seo data={seo} slug={slug} />
      <MainBanner image={mainBanner} title={formattedTitle} allTags={allTags} subTitle={subTitle}/>
      <Slider title={hotArticlesTitle} items={hotArticles}/>
      <Items items={allArticles} allTags={allTags}/>
      <Tiktok title={tiktokTitle} list={tiktokVideos}/>
      {pageFooter && <PageFooter footer={pageFooter}/>}
    </>
  )
}

export default InsightsPage

export const pageQuery = graphql`
    query InsightsPage($slug: String!) {
        allContentfulTag(filter: { name: { regex: "/Article:/" } }) {
            nodes {
                name
                contentful_id
            }
        }
        allContentfulArticle
        (sort: { fields: date, order: DESC }) {
            nodes {
                metadata {
					tags {
						name
						contentful_id
					}
				}
                featuredTitle {
                    raw
                }
				slug
				excerpt {
                    excerpt
                }
            }
        }
        contentfulInsights(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            slug
            mainBanner {
                ...Image
            }
            formattedTitle {
                raw
            }
            subTitle
            allTags
            hotArticlesTitle {
                raw
            }
            hotArticles {
                slug
                mainBanner {
                    ...Image
                }
                metadata {
                    tags {
                        name
                        contentful_id
                    }
                }
                featuredTitle {
                    raw
                }
            }
            tiktokTitle {
                raw
            }
            tiktokVideos {
                title
                url
                image {
                    ...Image
                }
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
			}
        }
    }
`
