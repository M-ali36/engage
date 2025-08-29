const footerSchema = `
    type ContentfulFooter implements Node {
        copyrights: String
        featuredTitle: ContentfulRichText
        socialLinks: [ContentfulLink] @link(by: "id", from: "socialLinks___NODE")
        detailsLinks: [ContentfulLink] @link(by: "id", from: "detailsLinks___NODE")
        socialMindsLinks: [ContentfulLink] @link(by: "id", from: "socialMindsLinks___NODE")
        hubsLinks: [ContentfulLink] @link(by: "id", from: "hubsLinks___NODE")
    }
`;

module.exports = footerSchema;