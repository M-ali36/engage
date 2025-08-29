import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'


const ServicePage = ({ data }) => {
  const {
    title,
    seo, 
    slug
  } = data.contentfulService

  return (
    <>
      <Seo data={seo} slug={`what-we-do/${slug}`} />
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
