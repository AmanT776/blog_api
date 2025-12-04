const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../Controller/User");
const router = require("express").Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
