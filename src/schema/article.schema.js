const articleSchema = `
    type ContentfulArticle implements Node {
        title: String
        slug: String
        mainImage: ContentfulAsset @link(by: "id", from: "mainImage___NODE")
        bannerImage: ContentfulAsset @link(by: "id", from: "bannerImage___NODE")
        content: ContentfulRichText
        formattedTitle: ContentfulRichText
    }
`;

module.exports = articleSchema;