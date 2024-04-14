const router = require("express").Router();
const { createNewUser } = require("../utils/user-controller");

// POST /api/users/register
// register new user
// expected body: { userName, fistName, password}
router.route("/register").post(createNewUser);

module.exports = router;
