const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../Controller/Category");
const express = require("express");
const router = express.Router();
const { authorize } = require("../Middleware/authorize");

router.post("/", authorize(["admin", "author"]), createCategory);
router.get("/", authorize(["admin", "author"]), getAllCategories);
router.get("/:id", authorize(["admin", "author"]), getCategoryById);
router.put("/:id", authorize(["admin", "author"]), updateCategory);
router.delete("/:id", authorize(["admin"]), deleteCategory);
module.exports = router;
