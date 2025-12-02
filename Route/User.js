const { createUser, getAllUsers } = require("../Controller/User");
const router = require("express").Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createUser);
router.get("/", getAllUsers);

module.exports = router;
