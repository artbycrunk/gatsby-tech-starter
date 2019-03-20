const urljoin = require('url-join');
const config = require('./SiteConfig');

function capitalizeFirstLetter(item) {
	return item.charAt(0).toUpperCase() + item.slice(1);
}

function buildURL(postPath) {
	let url;
	if (config.pathPrefix) {
		if (postPath) {
			url = urljoin(config.siteUrl, config.pathPrefix, postPath);
		} else {
			url = urljoin(config.siteUrl, config.pathPrefix);
		}
	} else if (postPath) {
		url = urljoin(config.siteUrl, postPath);
	} else {
		url = urljoin(config.siteUrl);
	}
	return url;
}

function postURL(postPath) {
	return buildURL(postPath);
}

function imageURL(image) {
	return buildURL(image);
}

function feedURL() {
	return buildURL(config.siteRss);
}

function baseURL() {
	return buildURL();
}

module.exports = {
	postURL,
	imageURL,
	feedURL,
	baseURL,
	capitalizeFirstLetter
};
