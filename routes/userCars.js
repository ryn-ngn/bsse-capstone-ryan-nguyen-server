const router = require("express").Router();
const {
  getUserCollectionById,
  postCarToCollection,
} = require("../utils/userCars-controller");

// GET /api/userCars
// retrieve cars in user collection
// expected body: [{ ownershipId, carId, userId},...]
router.route("/").get(getUserCollectionById).post(postCarToCollection);

module.exports = router;
