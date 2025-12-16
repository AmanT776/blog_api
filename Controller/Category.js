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
