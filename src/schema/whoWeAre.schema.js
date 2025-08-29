const whoWeAreSchema = `
    type ContentfulWhoWeAre implements Node {
        title: String
        slug: String
        mainBanner: ContentfulAsset @link(by: "id", from: "mainBanner___NODE")
    }
`;

module.exports = whoWeAreSchema;