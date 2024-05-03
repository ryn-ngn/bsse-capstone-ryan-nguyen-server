const router = require('express').Router();
const { getAdditionalCarInfo } = require('../utils/openAPI-controller');

// retrieve openAI suggestion for a car
// expected param: { make, model, year}
router.route('/:make/:model/:year').get(getAdditionalCarInfo);

module.exports = router;
