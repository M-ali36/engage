import { graphql } from 'gatsby'

export const query = graphql`
  fragment SEO on ContentfulSeo {
    seoTitle
    seoDescription {
      seoDescription
    }
    seoImage {
      file {
        url
      }
    }
    keywords
  }
`
