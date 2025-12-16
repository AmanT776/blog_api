const { Category } = require("../Model/associations");

exports.createCategory = async (req, res) => {
  const { category_name } = req.body;

  try {
    const category = await Category.findOne({
      where: {
        category_name: category_name.toLowerCase(),
      },
    });
    if (category) {
      return res.status(409).json({
        success: false,
        message: "category already exists",
      });
    }
    const createdCategory = await Category.create({
      category_name: category_name,
    });
    return res.status(200).json({
      success: true,
      message: "category created successfully",
      data: createdCategory,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating category",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching categories",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching category",
    });
  }
};
