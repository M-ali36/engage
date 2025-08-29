const standardSchema = `
    type ContentfulStandardContent implements Node {
        title: String
        slug: String
        mainBanner: ContentfulAsset @link(by: "id", from: "mainBanner___NODE")
        formattedTitle: ContentfulRichText
        content: ContentfulRichText
    }
`;

module.exports = standardSchema;