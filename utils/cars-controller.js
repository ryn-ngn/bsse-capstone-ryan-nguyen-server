const knex = require("knex")(require("../knexfile"));

// retrieve car basic info by id
const getBasicCarInfoById = async (req, res) => {
  const { carId } = req.params;
  if (!carId) {
    res.status(400).send("CarId is empty");
  }

  try {
    const result = await knex("cars").where("id", carId);

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Failed to retrieve car info");
  }
};

// GET all car makes
const getAllCarMakes = async (req, res) => {
  try {
    const result = await knex("cars").select("make").distinct();

    const makeArray = result.map((item) => item.make);
    return res.status(200).json(makeArray);
  } catch (error) {
    console.error("Failed to retrieve car makes:", error);
    return res.status(500).send("Failed to retrieve car makes");
  }
};

// GET all car model from makes
const getCarModelFromMake = async (req, res) => {
  const { make } = req.body;

  if (!make) {
    return res.status(400).send("Make is required");
  }

  try {
    const result = await knex("cars").where("make", make).select("model").distinct();

    const modelArray = result.map((item) => item.model);
    if (result.length === 0) {
      return res.status(404).send("Car models not found");
    }

    return res.status(200).json(modelArray);
  } catch (error) {
    console.error("Failed to find car models:", error);
    return res.status(500).send("Failed to find car models");
  }
};

// GET all car year from makes and model
const getCarYearFromMakeModel = async (req, res) => {
  const { make, model } = req.body;

  if (!make || !model) {
    return res.status(400).send("Make and model are required");
  }

  try {
    const result = await knex("cars")
      .where({
        make: make,
        model: model,
      })
      .select("year")
      .distinct();

    if (result.length === 0) {
      return res.status(404).send("Car years not found");
    }

    const yearArray = result.map((item) => item.year);
    return res.status(200).json(yearArray.sort());
  } catch (error) {
    console.error("Failed to find car years:", error);
    return res.status(500).send("Failed to find car years");
  }
};

module.exports = {
  getBasicCarInfoById,
  getAllCarMakes,
  getCarModelFromMake,
  getCarYearFromMakeModel,
};
