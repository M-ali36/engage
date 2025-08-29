import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'

const InsightsPage = ({ data }) => {
  const {
    seo,
    slug
  } = data.contentfulInsights

  const allTags = data.allContentfulTag.nodes
  const allArticles = data.allContentfulArticle.nodes

  return (
    <>
      <Seo data={seo} slug={slug} />
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
				title
				slug
				excerpt {
                    excerpt
                }
				mainImage {
					...Image
				}
            }
        }
        contentfulInsights(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            slug
        }
    }
`
