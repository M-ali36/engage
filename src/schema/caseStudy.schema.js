const caseStudySchema = `
    type ContentfulBanner implements Node {
        title: String
        image: ContentfulAsset @link(by: "id", from: "image___NODE")
        videoUrl: String
    }

    type ContentfulCaseStudy implements Node {
        title: String
        slug: String
        content: [ContentCaseStudy] @link(by: "id", from: "content___NODE")
    }
    union ContentCaseStudy = ContentfulInformation | ContentfulBanner | ContentfulResults | ContentfulTestimonials
`;

module.exports = caseStudySchema;