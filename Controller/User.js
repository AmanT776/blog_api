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
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      role_id: role_id,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json(err);
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
    return res.status(500).json(err);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(id)) {
    res.status(400).json({
      success: false,
      message: "id must be integer",
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
  return res.status(200).json({
    success: true,
    message: "user retrieved successfully",
    data: user,
  });
};
