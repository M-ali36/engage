const servicesSchema = `
    type ContentfulWhatWeDo implements Node {
        title: String
        slug: String
        mainBanner: ContentfulAsset @link(by: "id", from: "mainBanner___NODE")
    }
`;

module.exports = servicesSchema;