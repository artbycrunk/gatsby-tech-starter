const urljoin = require('url-join');
const config = require('./config');

function capitalizeFirstLetter(item) {
	return item.charAt(0).toUpperCase() + item.slice(1);
}

function buildURL(postPath) {
	let url;
	if (config.site.pathPrefix) {
		if (postPath) {
			url = urljoin(config.site.url, config.site.pathPrefix, postPath);
		} else {
			url = urljoin(config.site.url, config.site.pathPrefix);
		}
	} else if (postPath) {
		url = urljoin(config.site.url, postPath);
	} else {
		url = urljoin(config.site.url);
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
	return buildURL(config.site.rss);
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
