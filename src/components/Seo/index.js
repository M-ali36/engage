import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo({
    data,
    slug,
    meta = [],
    contentType = 'website',  // 'service', 'project', 'article', 'contact', or 'website'
    createdAt,
    updatedAt,
    currentService,
    currentProject,
}) {
    const { seoTitle: title, seoDescription: { seoDescriptions }, seoImage: image } = data
    const {
        contentfulGlobalConfigurations: {
            siteUrl,
            siteTitle,
            sitePhone,
            siteEmail,
            siteDescription: { siteDescription },
            siteShareImage,
            twitterUsername,
            socialLinks
        },
    } = useStaticQuery(
        graphql`
      query {
        contentfulGlobalConfigurations {
            siteTitle
            siteUrl
            sitePhone
            siteEmail
            siteDescription {
                siteDescription
            }
            siteShareImage {
                file {
                    url
                }
            }
            socialLinks {
                title
                url
            }
        }
      }
    `
    )

    function getFirstWords(text, maxLength = 170) {
        let currentLength = 0;
        let result = "";

        for (const word of text.split(' ')) {
            if (currentLength + word.length + 1 <= maxLength) {
                result += word + " ";
                currentLength += word.length + 1;
            } else {
                break;
            }
        }

        return result.trim();
    }

    const url = `${siteUrl.replace(/\/$/, '')}/${slug === 'home' ? '' : `${slug.replace(/^\/+|\/+$/g, '')}`
        }`
    const ogTitle = title ? `${siteTitle} | ${title.replace(/\s+/g, ' ').trim()}` : siteTitle;
    const ogDescription = seoDescriptions ? getFirstWords(seoDescriptions) : siteDescription
    const ogImage = `https:${image ? image.file.url : siteShareImage ? siteShareImage.file.url : ''}`

    const metaTags = [
        {
            name: `description`,
            content: ogDescription,
        },
        {
            name: `robots`,
            content: `follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`,
        },
        {
            property: `og:title`,
            content: ogTitle,
        },
        {
            property: `og:description`,
            content: ogDescription,
        },
        {
            property: `og:image`,
            content: ogImage,
        },
        {
            property: `og:type`,
            content: contentType === 'article' ? `article` : `website`,
        },
        {
            property: `og:url`,
            content: url,
        },
        {
            property: `og:locale`,
            content: `en_UK`,
        },
        {
            property: `og:site_name`,
            content: siteTitle,
        },
        {
            name: `twitter:card`,
            content: `summary`,
        },
        {
            name: `twitter:title`,
            content: ogTitle,
        },
        {
            name: `twitter:description`,
            content: ogDescription,
        },
        {
            property: `twitter:image`,
            content: ogImage,
        },
    ]

    const headLinks = [
        {
            rel: `canonical`,
            href: url
        }
    ]

    if (twitterUsername) {
        metaTags.push({
            name: `twitter:site`,
            content: `@${twitterUsername}`,
        })
    }

    // Dynamically generate the social media links from the `socialLinks` array
    const socialMediaLinks = socialLinks ? socialLinks.map(link => link.url) : [];

    // Structured Data for the Organization (this will be used on every page)
   const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": url,
        "name": siteTitle,
        "description": ogDescription,
        "mainEntityOfPage": url,
        "image": ogImage,
        "publisher": {
            "@type": "Organization",
            "name": siteTitle,
            "email": siteEmail,  // You can replace with your actual email
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}logo.png`
            },
            "sameAs": socialMediaLinks
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "areaServed": "UK",
            "availableLanguage": "English"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Monday",
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Tuesday",
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Wednesday",
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Thursday",
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Friday",
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "14:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "Closed",
                "closes": "Closed"
            }
        ]
    }

    // Structured Data for a Service Page (e.g., "Creative Content")
    const serviceData = contentType === 'service' && currentService ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": currentService.name,
        "provider": {
            "@type": "Organization",
            "name": siteTitle,
            "url": siteUrl
        },
        "areaServed": "Global",
        "description": currentService.description,
        "keywords": ["creative content", "video production", "social media content", "branding", "digital content creation"],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "Contact for Pricing",
            "eligibleRegion": {
                "@type": "Place",
                "name": "Global"
            }
        },
        "mainEntityOfPage": url,
        "url": url
    } : null;

    // Structured Data for a Project Page (e.g., case study like "What A Combo")
    const projectData = contentType === 'project' && currentProject ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": currentProject.title,
        "url": currentProject.url,
        "description": currentProject.description,
        "datePublished": currentProject.date,
        "publisher": {
            "@type": "Organization",
            "name": siteTitle,
            "url": siteUrl
        }
    } : null;

    // Structured Data for a Single Article Page
    const articleData = contentType === 'article' ? [{
        "@context": "https://schema.org",
        "@type": "Article",
        "url": url,
        "headline": ogTitle,
        "description": ogDescription,
        "datePublished": createdAt,
        "dateModified": updatedAt,
        "author": {
            "@type": "Organization",
            "name": siteTitle
        },
        "publisher": {
            "@type": "Organization",
            "name": siteTitle
        }
    }] : [];

    // Structured Data for the Contact Page
    const contactPageData = contentType === 'contact' ? {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "url": url,
        "mainEntity": {
            "@type": "Organization",
            "name": siteTitle,
            "email": siteEmail,  // Replace with your actual email
        }
    } : null;


    return (
        <Helmet
            htmlAttributes={{
                lang: 'en',
            }}
            title={ogTitle}
            meta={[...metaTags, ...meta]}
            link={[...headLinks]}
        >
            <script type="application/ld+json">
                {JSON.stringify(organizationData)}
            </script>
            {serviceData && (
                <script type="application/ld+json">
                    {JSON.stringify(serviceData)}
                </script>
            )}
            {projectData && (
                <script type="application/ld+json">
                    {JSON.stringify(projectData)}
                </script>
            )}
            {articleData && (
                <script type="application/ld+json">
                    {JSON.stringify(articleData)}
                </script>
            )}
            {contactPageData && (
                <script type="application/ld+json">
                    {JSON.stringify(contactPageData)}
                </script>
            )}
        </Helmet>
    )
}

Seo.propTypes = {
    data: PropTypes.object,
    slug: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    contentType: PropTypes.string,  // 'service', 'project', 'article', 'contact', or 'website'
    currentService: PropTypes.object,
    currentProject: PropTypes.object,
}

export default Seo
