const router = require('express').Router();
const {
  getBasicCarInfoById,
  getAllCarMakes,
  getCarModelFromMake,
  getCarYearFromMakeModel,
} = require('../utils/cars-controller');

// GET car makes
router.route('/make').get(getAllCarMakes);

// GET car models
// expect body: { make }
router.route('/:make').get(getCarModelFromMake);

// GET car years
// expect body: { make, model }
router.route('/:make/:model').get(getCarYearFromMakeModel);

// GET /api/cars/:carId
// retrieve basic car info from database
// expected params: { carId }
router.route('/:carId').get(getBasicCarInfoById);

module.exports = router;
