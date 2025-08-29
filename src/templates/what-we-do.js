import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'

const WhatWeDoPage = ({ data }) => {
  const {
    seo,
    slug
  } = data.contentfulWhatWeDo

  return (
    <>
      <Seo data={seo} slug={slug} />
    </>
  )
}

export default WhatWeDoPage

export const pageQuery = graphql`
    query WhatWeDoPage($slug: String!) {
        contentfulWhatWeDo(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            slug
        }
    }
`
