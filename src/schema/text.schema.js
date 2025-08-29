const textSchema = `
    type ContentfulText implements Node {
        title: String
        content: ContentfulRichText
    }
`;

module.exports = textSchema;