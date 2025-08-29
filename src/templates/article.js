import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'


const ArticlePage = ({ data }) => {
  const {
    seo,
    slug,
    updatedAt,
    createdAt
  } = data.contentfulArticle

  const moreArticles = data.allContentfulArticle.nodes;

  return (
    <>
      <Seo data={seo} slug={`insights/${slug}`} article parentCategory="news" createdAt={createdAt} updatedAt={updatedAt}/>
    </>
  )
}

export default ArticlePage

export const pageQuery = graphql`
    query ArticlePage($slug: String!) {
        
        contentfulArticle(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            metadata {
                tags {
                    name
                    contentful_id
                }
            }
            slug
            mainImage {
                ...Image
            }
            mainBanner {
                ...Image
            }
            featuredTitle {
                raw
            }
            content {
                raw
                references {
                    ...References
                }
            }
            updatedAt
            createdAt
        }
        allContentfulArticle (
                filter: {slug: { ne: $slug } }
            ) {
            nodes {
                title
                slug
                mainImage {
                    ...Image
                }
                metadata {
                    tags {
                        name
                        contentful_id
                    }
                }
            }
        }
    }
`
