const bcrypt = require("bcrypt");
const JWT_SALT_ROUNDS = process.env.JWT_SALT_ROUNDS;

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

// isUserNameAvailable
const isUserNameAvailable = async (userName) => {
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

module.exports = {
  getToken,
  hashPassword,
  isStringInputValid,
  isUserNameAvailable,
};
