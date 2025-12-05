const User = require("../Model/User");
const Role = require("../Model/Role");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, role_id } = req.body;
  if (!first_name || !last_name || !email || !role_id) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(409).json({
      success: false,
      message: "User already found",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      role_id: role_id,
    });
    const newUser = await User.findByPk(createdUser.id, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Role,
        attributes: ["role_name"],
      },
      raw: true,
      nest: true,
    });
    const { Role: userRole, ...newUserWithoutRole } = newUser;
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        ...newUserWithoutRole,
        role: userRole?.role_name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ["role_name"],
      },
      attributes: {
        exclude: ["role_id"],
      },
      raw: true,
      nest: true,
    });
    const data = users.map((user, index) => {
      const roleName = user.Role.role_name;
      const { Role, ...userWithoutRole } = user;

      return {
        ...userWithoutRole,
        role: roleName,
      };
    });
    return res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured while fetching users",
    });
    console.error(err);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user retrieved successfully",
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "user id required",
    });
  }
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    await User.update(req.body, {
      where: {
        id: id,
      },
    });
    const updatedUser = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured while updating the user",
    });
    console.error(err);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["password"],
    },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const deletedUser = await user.destroy();
    return res.status(200).json({
      success: true,
      message: "User deleted successfuly",
      data: deletedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An internal server error occured while deleting the user",
    });
  }
};
