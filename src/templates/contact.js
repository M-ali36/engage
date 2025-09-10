import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_ContactUs/MainBanner'


const ContactUsPage = ({ data }) => {
  const {
    seo,
    slug
  } = data.contentfulContactUs

  return (
    <>
      <Seo data={seo} slug={slug}/>
    </>
  )
}

export default ContactUsPage

export const pageQuery = graphql`
    query ContactUsPage($slug: String!) {
        
        contentfulContactUs(slug: { eq: $slug }) {
            slug
            seo {
                ...SEO
            }
            featuredTitle {
                raw
            }
            subTitle {
                raw
            }
            mainBanner {
                ...Image
            }
            links {
                ...Link
            }
            formTitle {
                raw
            }
            partnerTitle {
                raw
            }
            partnerMember {
                title
                rule
                image {
                    ...Image
                }
            }
            ourOffices {
                title
                content {
                    raw
                }
                image {
                    ...Image
                }
            }
            ourLocations {
                title
                image {
                    ...Image
                }
            }
        }
    }
`
