const router = require("express").Router();
const { createNewUser } = require("../utils/user-controller");
router.route("/register").post(createNewUser);

module.exports = router;
