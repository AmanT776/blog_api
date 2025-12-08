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

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json({
      success: true,
      message: "roles retrieved successfully",
      data: roles,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving roles",
    });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: "role not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "role retrieved successfully",
      data: role,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while retrieving role",
    });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role_name } = req.body;
  if (!role_name) {
    return res.status(400).json({
      success: false,
      message: "role name required",
    });
  }
  try {
    const updatedRole = await Role.update(req.body, {
      where: {
        id: id,
      },
    });
    const role = await Role.findByPk(id);
    return res.status(200).json({
      success: false,
      message: "role updated succesffully",
      data: role,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating role",
    });
  }
};
