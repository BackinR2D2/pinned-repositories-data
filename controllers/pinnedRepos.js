const axios = require('axios');
const cheerio = require('cheerio');

async function getPinnedRepos(req, res, next) {
	try {
		const { username } = req.params;
		const url = `https://github.com/${username}`;
		const { data: html } = await axios.get(url);
		const $ = cheerio.load(html);
		const pinnedReposHtml = $(
			'ol.d-flex.flex-wrap.list-style-none.gutter-condensed'
		).children();
		const pinnedRepos = [];
		pinnedReposHtml.map((i, pinnedRepo) => {
			const repoName = $(pinnedRepo).find('span.repo').text();
			const repoUrl = `https://github.com${$(pinnedRepo)
				.find('a')
				.attr('href')}`;
			const repoVisibility = $(pinnedRepo)
				.find('span.Label.Label--secondary')
				.text();
			const repoDescription = $(pinnedRepo)
				.find('p.pinned-item-desc')
				.text()
				.trim();
			const repoMainLanguage = $(pinnedRepo)
				.find('span[itemprop="programmingLanguage"]')
				.text();
			pinnedRepos.push({
				repoName,
				repoUrl,
				repoVisibility,
				repoDescription,
				repoMainLanguage,
			});
		});
		res.status(200).json(pinnedRepos);
	} catch (err) {
		res.status(err.statusCode || 500).json({ message: err.message });
	}
}

module.exports = {
	getPinnedRepos,
};
