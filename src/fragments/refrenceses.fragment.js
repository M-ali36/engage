import { graphql } from 'gatsby'

export const query = graphql`
  fragment References on Node {
    __typename
    ... on ContentfulLink {
      contentful_id
      __typename
      ...Link
    }
    ... on ContentfulAsset {
      contentful_id
      __typename
      ...Image
    }
  }
`