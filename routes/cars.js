const router = require("express").Router();
const {
  getBasicCarInfoById,
  getAllCarMakes,
  getCarModelFromMake,
  getCarYearFromMakeModel,
} = require("../utils/cars-controller");

// GET /api/cars/make
router.route("/make").get(getAllCarMakes);

// GET /api/cars/model
// expect body: { make }
router.route("/model").get(getCarModelFromMake);

// GET /api/cars/year
// expect body: { make, model }
router.route("/year").get(getCarYearFromMakeModel);

// GET /api/cars/:carId
// retrieve basic car info from database
// expected params: { carId }
router.route("/:carId").get(getBasicCarInfoById);

module.exports = router;
