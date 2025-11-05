import React, {useRef} from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import ContentReader from '@components/ContentReader'
import PropTypes from 'prop-types'

import * as classes from './index.module.css'
import AnimatedImage from '@Ui/AnimatedImage'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import LinkIcon from '@Svg/link-arrow-b.svg'
import AnimatedText from '../Ui/AnimatedText'


const getHeadingTag = (heading) => {
	switch(heading) {
		case 'Heading 1':
			return 'h1'
		case 'Heading 2':
			return 'h2'
		case 'Heading 3':
			return 'h3'
		case 'Heading 4':
			return 'h4'
		case 'Heading 5':
			return 'h5'
		case 'Heading 6':
			return 'h6'
		case 'Paragraph':
			return 'p'
		default:
			return null;
	}
}

const Heading = ({heading, children, customClasses, defaults, ...props}) => {
	const CustomTag = getHeadingTag(heading) ? getHeadingTag(heading) : defaults;
	return <CustomTag className={customClasses} {...props}>{children}</CustomTag>
}

Heading.propTypes = {
	heading: PropTypes.string,
	customClasses: PropTypes.string,
	defaults: PropTypes.string,
	children: PropTypes.array,
}

const SmartLink = ({ to, children, ...props }) => {
  const isInternal = /^\/(?!\/)/.test(to) || to.startsWith(window.location.origin)

  if (isInternal) {
	return (
	  <Link to={to} {...props}>
		{children}<LinkIcon className={classes.linkIcon}/>
	  </Link>
	)
  }

  return (
	<a href={to} target="_blank" rel="noreferrer" {...props}>
	  {children}
	</a>
  )
}

const RichText = ({
	content, 
	ele, 
	useHeadings, 
	slug, 
	relatedArticles, 
	staticImages = false ,  
	splitType="words", 
	direction = 'right',
	delay = 0,
	useAnimate = false, 
	...props
}) => {
	const getBackLink = (link, children) => {
		if (!relatedArticles) return <strong className={classes.bold}>{children}</strong>; 
		const relatedArticle = relatedArticles ? relatedArticles.find(article => article.tags.includes(children[0][0])) : [];
		return (
			<>
				{relatedArticle ?
					<a href={`/${relatedArticle.parentCategory.slug}/${relatedArticle.slug}`} className={classes.link} title={relatedArticle.title}>
						{children}
					</a>
					:
					<strong className={classes.bold}>{children}</strong>
				}
			</>
		)
	}

	function getQueryString(url) {
		if(url.startsWith('?keyword=')){
			return url;
		}
		const urlObj = new URL(url);
		return urlObj.search;
	}

	const animatedTextRef = useRef();

	const options = {
		renderMark: {
			[MARKS.BOLD]: (text) => <strong className={classes.bold}>{text}</strong>,
			[MARKS.ITALIC]: (text) => <em className={classes.italics}>{text}</em>,
			[MARKS.UNDERLINE]: text => <u className={classes.underLines}>{text}</u>,
			[MARKS.SUBSCRIPT]: text => <sub className={classes.sub}>{text}</sub>,
			[MARKS.SUPERSCRIPT]: text => <sup className={classes.sup}>{text}</sup>,
			[MARKS.CODE]: text => <code className={classes.code}>{text}</code>,
		},
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => <Heading ref={animatedTextRef} defaults="p" heading={useHeadings} customClasses={`${classes.paragraph} ${useAnimate ? classes.animated : ''}`} {...props}>
				{useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
			</Heading>,
			[BLOCKS.HEADING_1]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h1" heading={useHeadings} customClasses={`${classes.heading_1}  ${useAnimate ? classes.animated : ''}`}>
				  	{useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.HEADING_2]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h2" heading={useHeadings} customClasses={`${classes.heading_2}  ${useAnimate ? classes.animated : ''}`}>
				  {useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.HEADING_3]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h3" heading={useHeadings} customClasses={`${classes.heading_3}  ${useAnimate ? classes.animated : ''}`}>
				  {useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.HEADING_4]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h4" heading={useHeadings} customClasses={`${classes.heading_4}  ${useAnimate ? classes.animated : ''}`}>
				  {useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.HEADING_5]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h5" heading={useHeadings} customClasses={`${classes.heading_5}  ${useAnimate ? classes.animated : ''}`}>
				  {useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.HEADING_6]: (node, children) => (
				<Heading ref={animatedTextRef} defaults="h6" heading={useHeadings} customClasses={`${classes.heading_6}  ${useAnimate ? classes.animated : ''}`}>
				  {useAnimate ?
				  		<AnimatedText text={children} splitType={splitType} direction={direction} delay={delay}/>
						:
						<>{children}</>
					}
				</Heading>
			),
			[BLOCKS.OL_LIST]: (node, children) => (
				<ol className={classes.olList}>{children}</ol>
			),
			[BLOCKS.UL_LIST]: (node, children) => (
				<ul className={classes.ulList}>{children}</ul>
			),
			[BLOCKS.LIST_ITEM]: (node, children) => (
				<li className={classes.li}>{children}</li>
			),
			[BLOCKS.TABLE]: (node, children) => {
				return (
					<div className={classes.tableWrapper}>
						<table className={classes.table}>
							<tbody>{children}</tbody>
						</table>
					</div>
				)
			},
			[BLOCKS.TABLE_ROW]: (node, children) => <tr className={classes.tableRow}>{children}</tr>,
			[BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
				<th className={classes.tableHead}>{children}</th>
			),
			[BLOCKS.TABLE_CELL]: (node, children) => (
				<td className={classes.tableCell}>{children}</td>
			),
			[BLOCKS.HR]: () => <hr className={classes.hr}/>,
			[BLOCKS.QUOTE]: (node, children) => <blockquote className={classes.blockquote}>
				{children}
			</blockquote>,

			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const { title, gatsbyImageData, width, height } = node.data.target
				return (
					<>
						{staticImages ?
							<GatsbyImage 
								image={gatsbyImageData}
								alt={title}
							/>
							:
							<div className={classes.imageContainer} data-image-wrapper>
								<AnimatedImage image={node.data.target} className={classes.image}/>
							</div>
						}
					</>
				)
			},
			[BLOCKS.EMBEDDED_ENTRY]: node => {
				const block = node.data.target
				return <ContentReader data={block} />
			},
			['embedded-entry-inline']: node => {
				const block = node.data.target
				return <ContentReader data={block} />
			},
			[INLINES.HYPERLINK]: (node, children) => (
				<>
					{(node.data.uri.includes('?keyword=')) ? 
						<>{getBackLink(node.data.uri, children)}</>
						:
						<SmartLink to={node.data.uri} className={classes.link}>
							{children}
						</SmartLink>
					}
				</>
			),
			[INLINES.ASSET_HYPERLINK]: (node, children) => (
				<a href={node.data.target.file.url} className={classes.link}>{children}</a>
			),
			[INLINES.ENTRY_HYPERLINK]: (node, children) => {
				const block = node.data.target
				return <Link to={block.url}>{children}</Link>
			},
		},
		renderText: text =>
		React.Children.toArray(
			text.split('\n').map((t, i) =>
				text.length === 0 && t === '' ? '' : i > 0 ? (
					<>
					{useHeadings ?
						<span className={classes.br}></span>
						:
						<br />
					}
					{t}
					</>
				) : (
					t
				)
			)
		),
	}
	return (
		<div ref={ele} {...props}>
			{renderRichText(content, options)}
		</div>
	)
}

export default RichText

RichText.propTypes = {
	content: PropTypes.object,
	useHeadings: PropTypes.string,
	ele: PropTypes.object,
};