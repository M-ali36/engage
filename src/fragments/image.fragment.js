import { graphql } from 'gatsby'

export const query = graphql`
  fragment Image on ContentfulAsset {
    contentful_id
    description
    gatsbyImageData(
      placeholder: BLURRED
      formats: [AUTO, WEBP, AVIF]
      quality: 70
    )
    file {
      contentType
      url
    }
  }
`