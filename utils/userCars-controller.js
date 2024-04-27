const uuid = require("uuid").v4;

// retrieve userCars
// expected body { userId: userId }
const knex = require("knex")(require("../knexfile"));

const getUserCollectionById = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).res.status(400).send("User ID is empty");
  }

  try {
    const userCars = await knex("userCars").where("userId", userId);
    return res.status(200).json(userCars);
  } catch (error) {
    res.status(400).res.status(400).send("Failed to retrieve car collection");
  }
};

// post new car to user's collection
// expected body: {carId, userId}
const postCarToCollection = async (req, res) => {
  const { userId, carId } = req.body;

  if (!userId || !carId) {
    res.status(400).res.status(400).send("User ID and/or car id is empty");
  }

  const carDataToAdd = {
    ownershipId: uuid(),
    carId: carId,
    userId: userId,
  };

  try {
    await knex("userCars").insert(carDataToAdd);
    return res.status(201).json(carDataToAdd);
  } catch (error) {
    res.status(400).res.status(400).send("Failed to add car to collection");
  }
};

module.exports = {
  getUserCollectionById,
  postCarToCollection,
};
