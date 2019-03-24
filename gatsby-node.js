const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const config = require('./data/config');
const common = require('./data/common');

const postNodes = [];

function addSiblingNodes(createNodeField) {
	postNodes.sort(({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
		const dateA = moment(date1, config.site.dateFromFormat);
		const dateB = moment(date2, config.site.dateFromFormat);

		if (dateA.isBefore(dateB)) return 1;

		if (dateB.isBefore(dateA)) return -1;

		return 0;
	});
	for (let i = 0; i < postNodes.length; i += 1) {
		const nextID = i + 1 < postNodes.length ? i + 1 : 0;
		const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;
		const currNode = postNodes[i];
		const nextNode = postNodes[nextID];
		const prevNode = postNodes[prevID];
		createNodeField({
			node: currNode,
			name: 'nextTitle',
			value: nextNode.frontmatter.title
		});
		createNodeField({
			node: currNode,
			name: 'nextSlug',
			value: nextNode.fields.slug
		});
		createNodeField({
			node: currNode,
			name: 'prevTitle',
			value: prevNode.frontmatter.title
		});
		createNodeField({
			node: currNode,
			name: 'prevSlug',
			value: prevNode.fields.slug
		});
	}
}

function resolveTemplate(templateName) {
	const templates = config.templates.path;
	let foundTemplate = 'post';
	if (Object.prototype.hasOwnProperty.call(config.templates.postTypes, templateName)) {
		foundTemplate = config.templates.postTypes[templateName];
	}
	const url = common.urljoin(templates, `${foundTemplate}.jsx`);
	return path.resolve(url);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	let slug;
	let date = '';
	if (node.internal.type === 'MarkdownRemark') {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);
		if (
			Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
		) {
			slug = `/${_.kebabCase(node.frontmatter.title)}`;
		} else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === '') {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
				slug = `/${_.kebabCase(node.frontmatter.slug)}`;
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'permalink'))
				slug = `/${node.frontmatter.permalink}`;
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
				date = moment(node.frontmatter.date, config.site.dateFromFormat);
				if (!date.isValid) console.warn(`WARNING: Invalid date.`, node.frontmatter);

				createNodeField({
					node,
					name: 'date',
					value: date.toISOString()
				});
			}
		}
		createNodeField({ node, name: 'slug', value: slug });
		postNodes.push(node);
	}

	if (node.internal.type === `Mdx`) {
		const parent = getNode(node.parent);

		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);

		if (
			Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
		) {
			slug = `/${_.kebabCase(node.frontmatter.title)}`;
		} else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === '') {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
				slug = `/${_.kebabCase(node.frontmatter.slug)}`;
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'permalink'))
				slug = `/${node.frontmatter.permalink}`;
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
				date = moment(node.frontmatter.date, config.site.dateFromFormat);
				if (!date.isValid) console.warn(`WARNING: Invalid date.`, node.frontmatter);

				date = date.toISOString();
			}
		}

		createNodeField({
			name: 'id',
			node,
			value: node.id
		});

		createNodeField({
			name: 'title',
			node,
			value: node.frontmatter.title
		});

		createNodeField({
			name: 'description',
			node,
			value: node.frontmatter.description
		});

		createNodeField({
			name: 'slug',
			node,
			value: slug
		});

		createNodeField({
			name: 'date',
			node,
			value: date
		});

		createNodeField({
			name: 'banner',
			node,
			banner: node.frontmatter.banner
		});

		createNodeField({
			name: 'categories',
			node,
			value: node.frontmatter.category || []
		});

		createNodeField({
			name: 'keywords',
			node,
			value: node.frontmatter.keywords || []
		});
	}
};

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
	const { name } = type;
	const { createNodeField } = actions;
	if (name === 'MarkdownRemark' || name === 'Mdx') {
		addSiblingNodes(createNodeField);
	}
};

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			alias: {
				$components: path.resolve(__dirname, 'src/components')
			}
		}
	});
};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		const postPage = resolveTemplate('post');

		resolve(
			graphql(
				`
					{
						allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
							edges {
								node {
									frontmatter {
										tags
										category
										permalink
										page_type
									}
									fields {
										title
										slug
									}
									code {
										scope
									}
								}
							}
						}
					}
				`
			).then(result => {
				if (result.errors) {
					/* eslint no-console: "off" */
					console.log(result.errors);
					reject(result.errors);
				}

				const tagSet = new Set();
				const categorySet = new Set();

				const { edges } = result.data.allMdx;
				edges.forEach(({ node }, i) => {
					const prev = i === 0 ? null : edges[i - 1].node;
					const next = i === edges.length - 1 ? null : edges[i + 1].node;
					const { tags, category, permalink, page_type } = node.frontmatter;

					if (tags) {
						tags.forEach(tag => {
							tagSet.add(tag);
						});
					}

					if (category) {
						categorySet.add(category);
					}

					let pagePath = node.fields.slug;
					if (permalink != null) {
						pagePath = permalink;
					}

					let currentPage = postPage;
					// TODO  cache the template lookup
					if (Object.prototype.hasOwnProperty.call(config.templates.postTypes, page_type)) {
						const templatePage = resolveTemplate(page_type);
						currentPage = templatePage;
					}

					createPage({
						path: pagePath,
						component: currentPage,
						context: {
							id: node.id,
							slug: node.fields.slug,
							prev,
							next
						}
					});
				});

				const tagList = Array.from(tagSet);
				if (tagList) {
					const tagPage = resolveTemplate('tag');
					tagList.forEach(tag => {
						createPage({
							path: `/tags/${_.kebabCase(tag)}/`,
							component: tagPage,
							context: {
								tag
							}
						});
					});
				}

				const categoryList = Array.from(categorySet);
				if (categoryList) {
					const categoryPage = resolveTemplate('category');
					categoryList.forEach(category => {
						createPage({
							path: `/${_.kebabCase(category)}/`,
							component: categoryPage,
							context: {
								category
							}
						});
					});
				}
			})
		);
	});
};
