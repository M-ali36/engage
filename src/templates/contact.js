import React from 'react'
import { graphql } from 'gatsby'
import Seo from '@components/Seo'
import MainBanner from '@components/_ContactUs/MainBanner'
import Form from '@components/_ContactUs/Form'
import OurOffices from '../components/_ContactUs/OurOffices'
import OurLocations from '../components/_ContactUs/OurLocations'
import Card from '../components/_ContactUs/Card'


const ContactUsPage = ({ data }) => {
  const {
    seo,
    slug,
    featuredTitle,
    subTitle,
    mainBanner,
    links,
    formTitle,
    partnerMember,
    partnerTitle,
    ourOffices,
    ourLocations
  } = data.contentfulContactUs

  return (
    <>
      <Seo data={seo} slug={slug}/>
      <MainBanner title={featuredTitle} image={mainBanner} subTitle={subTitle}/>
      <Form title={formTitle} links={links}/>
      <Card data={partnerMember} partnerTitle={partnerTitle}/>
      <OurOffices items={ourOffices}/>
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
                links {
                    ...Link
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
