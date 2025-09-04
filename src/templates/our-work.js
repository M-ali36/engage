import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_OurWork/MainBanner'
import Items from '@components/_OurWork/Items'
import Testimonials from '@components/Testimonials'

const OurWorkPage = ({ data }) => {
  const {
    seo,
    slug,
    pageSubTitle,
    testimonials,
    testimonialsImage
  } = data.contentfulOurWork;
  
  const allCaseStudies = data.allContentfulCaseStudy.nodes
  const alltags = data.allContentfulTag.nodes

  return (
    <>
      <Seo data={seo} slug={slug} />
      <MainBanner subTitle={pageSubTitle}/>
      <Items items={allCaseStudies} tags={alltags}/>
      <Testimonials items={testimonials} image={testimonialsImage}/>
    </>
  )
}

export default OurWorkPage

export const pageQuery = graphql`
    query OurWorkPage($slug: String!) {
        allContentfulTag {
            nodes {
                name
                contentful_id
            }
        }
        allContentfulCaseStudy(sort: { fields: [order, createdAt], order: [DESC, DESC] }) {
            nodes {
                title
                slug
                mainImage {
                    ...Image
                }
                excerpt {
                    excerpt
                }
                metadata {
                    tags {
                        name
                        contentful_id
                    }
                }
            }
        }
        contentfulOurWork(slug: { eq: $slug }) {
            seo {
                ...SEO
            }
            slug
            pageSubTitle {
                raw
            }
            testimonials {
                image {
                    ...Image
                }
                content {
                    raw
                }
            }
            testimonialsImage {
                ...Image
            }
        }
    }
`
