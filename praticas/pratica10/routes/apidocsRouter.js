var express = require('express');
var swaggerUI = require('swagger-ui-express');
var fs = require('fs');
var YAML = require('yaml');

var router = express.Router();

var file = fs.readFileSync('./swagger.yaml', 'utf8');
var swaggerDocument = YAML.parse(file);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;