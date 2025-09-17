import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_StandardContent/MainBanner'
import Content from '@components/_StandardContent/Content'


const StandardContentPage = ({ data }) => {
  const {
    seo,
    slug,
    mainBanner,
    title,
    content,
  } = data.contentfulStandardContent

  return (
    <>
      <Seo data={seo} slug={slug}/>
      <MainBanner image={mainBanner} title={title}/>
      <Content content={content}/>
    </>
  )
}

export default StandardContentPage

export const pageQuery = graphql`
    query StandardContentPage($slug: String!) {
        
        contentfulStandardContent(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            title
            slug
            mainBanner {
                ...Image
            }
            content {
                raw
                references {
                    ...References
                }
            }
        }
    }
`
