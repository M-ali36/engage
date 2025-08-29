const projectSchema = `
    type ContentfulProject implements Node {
        title: String
        slug: String
        clientName: String
        mainImage: ContentfulAsset @link(by: "id", from: "mainImage___NODE")
        bannerImage: ContentfulAsset @link(by: "id", from: "bannerImage___NODE")
        logoImage: ContentfulAsset @link(by: "id", from: "logoImage___NODE")
        featuredTitle: ContentfulRichText
        results: [ContentfulText] @link(by: "id", from: "results___NODE")
    }
`;

module.exports = projectSchema;