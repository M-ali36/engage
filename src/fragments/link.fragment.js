import { graphql } from 'gatsby'

export const query = graphql`
  fragment Link on ContentfulLink {
    __typename
    title
    url
    linkType
    icon
    linkToPage {
        ... on ContentfulHome {
            slug
        }
    }
  }
`