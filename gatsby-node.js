const path = require(`path`);
const pages = [
  {
    query: 'allContentfulAbout',
    template: path.resolve('./src/templates/about-us.js')
  },
  {
    query: 'allContentfulContactUs',
    template: path.resolve('./src/templates/contact.js')
  },
  {
    query: 'allContentfulCareers',
    template: path.resolve('./src/templates/careers.js')
  },
  {
    query: 'allContentfulInsights',
    template: path.resolve('./src/templates/insights.js')
  },
  {
    query: 'allContentfulArticle',
    template: path.resolve('./src/templates/article.js'),
    path: 'insights/'
  },
  {
    query: 'allContentfulOurWork',
    template: path.resolve('./src/templates/our-work.js')
  },
  {
    query: 'allContentfulStandardContent',
    template: path.resolve('./src/templates/standard-content.js')
  },
  {
    query: 'allContentfulCaseStudy',
    template: path.resolve('./src/templates/case-study.js'),
    path: 'our-work/'
  },
  
]

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const query = `
    {
    ${pages
      .map(
        dataItem => `
        ${dataItem.query}(filter: { slug: { ne: "/" } }) {
          edges {
            node {
              id
              slug
            }
          }
        }`
      )
      .join('')}
    }
  `

  const queryResults = await graphql(query)

  if (queryResults.errors) {
    reporter.panicOnBuild(
      `There was an error loading your content`,
      queryResults.errors
    )
    return
  }

  pages.forEach(dataItem => {
    const pages = queryResults.data[dataItem.query].edges

    pages.forEach(page => {
      const config = {
        path: `/${dataItem.path || ''}${page.node.slug}/`,
        component: dataItem.template,
        ownerNodeId: page.node.id,
        context: {
          slug: page.node.slug,
          tags: page.node.tags
        },
      }

      if (page.node.slug === 'content-studios-and-production') {
        config.context.tag = '/serviceContentStudiosProduction/'
      }

      if (page.node.slug === 'audience-development-strategy') {
        config.context.tag = '/serviceAudienceDevelopmentStrategy/'
      }

      if (page.node.slug !== 'home') {
        createPage(config)
      }
    })
  })
}

const globalsSchema = require("./src/schema/globals.schema.js");
const richText = require("./src/schema/richText.schema.js");
const textSchema = require("./src/schema/text.schema.js");
const link = require("./src/schema/link.schema.js");
const seoSchema = require("./src/schema/seo.schema.js");

const standardSchema = require("./src/schema/standard.schema.js");
const homePageSchema = require("./src/schema/homePage.schema.js");
const caseStudySchema = require("./src/schema/caseStudy.schema.js");
const articleSchema = require("./src/schema/article.schema.js");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  createTypes(`
    ${globalsSchema}
    ${richText}
    ${textSchema}
    ${link}
    ${seoSchema}
    ${standardSchema}
    ${homePageSchema}
    ${caseStudySchema}
    ${articleSchema}
  `);
};
