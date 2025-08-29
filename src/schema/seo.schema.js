const seoSchema = `
    type ContentfulSeo implements Node {
        title: String
        keywords: [String]
    }
`;

module.exports = seoSchema;