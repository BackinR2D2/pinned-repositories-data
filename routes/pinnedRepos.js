const {getPinnedRepos} = require('../controllers/pinnedRepos');
const router = require('express').Router();

router.get('/pinned-repos/:username', getPinnedRepos);

module.exports = router;
