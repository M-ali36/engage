const globalsSchema = `
    type ContentfulGlobalConfigurations implements Node {
        siteTitle: String
        siteUrl: String
        siteShareImage: ContentfulAsset @link(by: "id", from: "siteShareImage___NODE")
        siteEmail: String
        sitePhone: String
        newsletterMessage: ContentfulRichText
        socialLinks: [ContentfulLink] @link(by: "id", from: "socialLinks___NODE")
        defaultPageFooter: ContentfulPageFooter @link(by: "id", from: "defaultPageFooter___NODE")
        headerMessage: ContentfulRichText
    }

    type ContentfulPageFooter implements Node {
        title: String
        content: ContentfulRichText
        link: ContentfulLink @link(by: "id", from: "link___NODE")
    }
`;

module.exports = globalsSchema;