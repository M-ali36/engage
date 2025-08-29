const serviceSchema = `
    type ContentfulService implements Node {
        title: String
        slug: String
        mainImage: ContentfulAsset @link(by: "id", from: "mainImage___NODE")
    }
`;

module.exports = serviceSchema;