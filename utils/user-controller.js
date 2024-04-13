const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid").v4;
const {
  hashPassword,
  isStringInputValid,
  isUserNameAvailable,
} = require("../utils/helper");

// register a new user
const createNewUser = async (req, res) => {
  try {
    const { userName, firstName, password } = req.body;

    if (!isStringInputValid([userName, firstName, password])) {
      return res.status(400).json({ message: "Invalid input" });
    }

    if (!isUserNameAvailable(userName)) {
      return res.status(400).json({ message: "Username has been taken" });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await knex("users").insert({
      id: uuid(),
      userName,
      hashedPassword,
      firstName,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to register new user: ${error.message}`,
    });
  }
};

module.exports = {
  createNewUser,
};
