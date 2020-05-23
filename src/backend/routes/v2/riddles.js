// const {logActivity} = require('@b/keen');
const riddlesController = require('@b/controllers/riddles');

module.exports = function(router) {
	router.get('/api/v2/riddles(/:key)?', (req, res) => {
		// logActivity(req, params);

		if (req.params.key) {
			return riddlesController.findRiddleByKey(req.params.key).then(riddle => {
				res.json({'riddle': riddle});
			}).catch(err => {
				res.json({'error': err});
			});
		}

		riddlesController.findRandomRiddle().then(riddle => {
			res.json({'riddle': riddle});
		}).catch(err => {
			if (err.name === 'CastError') {
				res.json({'error': 'Failed to query due to error in arguments'});
			}
			else {
				res.json({'error': err.message || 'There was an error querying for riddle'});
			}
		});
	});
};