module.exports = `
    type ContentfulLink {
      title: String
      url: String
      linkType: String
      linkToPage: ContentPageLink @link(by: "id", from: "linkToPage___NODE")
    }
    union ContentPageLink = ContentfulHome | ContentfulContactUs
`