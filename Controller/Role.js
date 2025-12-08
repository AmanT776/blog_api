const Role = require("../Model/Role");

exports.createRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const role = await Role.findOne({
      where: {
        role_name: role_name,
      },
    });

    if (role) {
      return res.status(409).json({
        success: false,
        message: "role already found",
      });
    }
    const createdRole = await Role.create(req.body);
    return res.status(200).json({
      success: true,
      message: "role created successfully",
      data: createdRole,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating role",
    });
  }
};
