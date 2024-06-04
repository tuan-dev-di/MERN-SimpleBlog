const express = require("express");
const { sign_up } = require("../controllers/user/user.sign_up.controller.js");
const { sign_in } = require("../controllers/user/user.sign_in.controller.js");
// const { sign_up, sign_in } = require("../controllers/user/index.js");

const router = express.Router();

router.post("/sign-up", sign_up);
router.post("/sign-in", sign_in);

module.exports = router;
