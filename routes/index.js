var express = require('express');
const { NoAuthentication } = require('../middleware/auth.middleware');
var router = express.Router();

/* GET home page. */
router.get('/', NoAuthentication, function(req, res) {
  res.render('index', { title: 'Home', user: req.user});
});

module.exports = router;
