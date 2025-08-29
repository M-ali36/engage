module.exports = `
    type ContentfulRichText{
      raw: String
      references: [ContentTextBlockRefrences] @link(by: "id", from: "references___NODE")
    }
    union ContentTextBlockRefrences = ContentfulLink | ContentfulAsset
`