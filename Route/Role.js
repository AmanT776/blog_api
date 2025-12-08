const express = require("express");
const router = express.Router();
const { createRole, getAllRoles } = require("../Controller/Role");
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin"]), createRole);
router.get("/", getAllRoles);

module.exports = router;
