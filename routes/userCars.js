const router = require("express").Router();
const {
  getUserCollectionById,
  postCarToCollection,
  deleteCarFromCollection,
} = require("../utils/userCars-controller");

// GET /api/userCars
// retrieve cars in user collection
// expected body: [{ ownershipId, carId, userId},...]
router
  .route("/")
  .get(getUserCollectionById)
  .post(postCarToCollection)
  .delete(deleteCarFromCollection);

module.exports = router;
