import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'


const ServicePage = ({ data }) => {
  const {
    title,
    seo, 
    slug
  } = data.contentfulService

  const allArticles = data.allArticles.nodes;

  return (
    <>
      <Seo data={seo} slug={`services/${slug}`} />
    </>
  )
}

export default ServicePage

export const pageQuery = graphql`
    query ServicePage($slug: String!) {
        contentfulService(slug: { eq: $slug }) {
            title
            seo {
                ...SEO
            }
            slug
        }
    }
`
