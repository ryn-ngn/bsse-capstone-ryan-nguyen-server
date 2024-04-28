const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const JWT_SALT_ROUNDS = parseInt(process.env.JWT_SALT_ROUNDS);

const getToken = (req) => {
  if (!req.headers.authorization) {
    return;
  } else {
    return req.headers.authorization.split(" ")[1];
  }
};

// string input needs to have minimum 2 character
const isStringInputValid = (inputArr) => {
  for (input of inputArr) {
    if (!input || input.length < 2) {
      return false;
    }
  }
  return true;
};

// hash password input received
const hashPassword = async (inputPassword) => {
  try {
    const salt = await bcrypt.genSalt(JWT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(inputPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Unable to harsh input password: ", error);
  }
};

// checkUserNameAvailability
const checkUserNameAvailability = async (userName) => {
  try {
    const users = await getAllUsers();
    // attempt to look for userName in existing data
    const matchingUserName = users.find((user) => user.userName === userName);
    // return the negated find result
    return !matchingUserName;
  } catch (error) {
    console.error("Unable to verify new userName", error);
  }
};

// getAllUsers
const getAllUsers = async () => {
  try {
    const users = await knex("users");
    return users;
  } catch (error) {
    console.error("Error fetching users data", error);
    throw new Error("Error fetching users data");
  }
};

const getOwnershipId = async (carId, userId) => {
  try {
    const result = await knex("userCars")
      .select("ownershipId")
      .where({
        carId: carId,
        userId: userId,
      })
      .first();

    return result ? result.ownershipId.trim() : null;
  } catch (error) {
    console.error("Error fetching ownershipId", error);
    throw new Error("Error fetching ownershipId");
  }
};

module.exports = {
  getToken,
  hashPassword,
  isStringInputValid,
  checkUserNameAvailability,
  getOwnershipId,
};
