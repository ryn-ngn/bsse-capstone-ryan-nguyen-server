const router = require("express").Router();
const { createNewUser, loginUser } = require("../utils/user-controller");

// POST /api/users/register
// register new user
// expected body: { userName, fistName, password}
router.route("/register").post(createNewUser);

// POST /api/users/login
// user login
// expected body: { userName, password}
router.route("/login").post(loginUser);

module.exports = router;
