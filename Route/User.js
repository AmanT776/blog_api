const { createUser, getAllUsers, getUserById } = require("../Controller/User");
const router = require("express").Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
