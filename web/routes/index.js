var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Express' });
});

/* POST - send email */
router.post('/', function (req, res, next) {
	return res.redirect('/');
});

module.exports = router;
