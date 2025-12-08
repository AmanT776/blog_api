const express = require("express");
const router = express.Router();
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
} = require("../Controller/Role");
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);

module.exports = router;
