const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;
const JWT_SECRET = process.env.JWT_SECRET;

const {
  hashPassword,
  isStringInputValid,
  checkUserNameAvailability,
} = require('../utils/helper');
const e = require('express');

// register a new user
// expected body: { userName, fistName, password}
const createNewUser = async (req, res) => {
  const { userName, firstName, password } = req.body;

  if (!isStringInputValid([userName, firstName, password])) {
    return res.status(400).json({ message: 'Empty or Invalid input' });
  }

  try {
    const isUserNameAvailable = await checkUserNameAvailability(userName);
    const hashedPassword = await hashPassword(password);

    if (!isUserNameAvailable) {
      return res.status(400).json({ message: 'Username has been taken' });
    }
    const [newUser] = await knex('users').insert({
      id: uuid(),
      userName,
      hashedPassword,
      firstName,
    });

    return res.status(201).send('Registered successfully');
  } catch (error) {
    res.status(400).res.status(400).send('Failed registration');
  }
};

// user login
// expected body: { userName, password}
// response format: {token: jwt token}
const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!isStringInputValid([userName, password])) {
    return res.status(400).json({ message: 'Empty or Invalid input' });
  }

  // validate userName
  const user = await knex('users').where({ userName: userName }).first();
  if (!user) {
    return res.status(400).send('Username not found');
  }

  // validate password
  try {
    const isPasswordMatched = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordMatched) {
      return res.status(400).send('Invalid password');
    }
  } catch (error) {
    console.error(error);
  }

  // if all validation passed, create token
  const Bearer = jwt.sign({ id: user.id, firstName: user.firstName }, JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({ Bearer, userId: user.id });
};
module.exports = {
  createNewUser,
  loginUser,
};
