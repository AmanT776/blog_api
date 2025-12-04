const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controller/User");
const router = require("express").Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
