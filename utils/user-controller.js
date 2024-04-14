const knex = require("knex")(require("../knexfile"));
const uuid = require("uuid").v4;
const {
  hashPassword,
  isStringInputValid,
  isUserNameAvailable,
} = require("../utils/helper");

// register a new user
// expected body: { userName, fistName, password}
const createNewUser = async (req, res) => {
  const { userName, firstName, password } = req.body;

  if (!isStringInputValid([userName, firstName, password])) {
    return res.status(400).json({ message: "Empty or Invalid input" });
  }

  if (!isUserNameAvailable(userName)) {
    return res.status(400).json({ message: "Username has been taken" });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const [newUser] = await knex("users").insert({
      id: uuid(),
      userName,
      hashedPassword,
      firstName,
    });

    return res.status(201).send("Registered successfully");
  } catch (error) {
    res.status(400).res.status(400).send("Failed registration");
  }
};

module.exports = {
  createNewUser,
};
