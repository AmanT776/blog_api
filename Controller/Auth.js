const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/generateTokens");

//models
const Role = require("../Model/Role");
const User = require("../Model/User");

exports.signup = async (req, res) => {
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
      message: "user already found",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
    role_id: role_id,
  });

  if (createUser) {
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Role,
        attributes: ["role_name"],
      },
      raw: true,
      nest: true,
    });
    return res.status(200).json({
      success: true,
      message: "Account Successfully Created",
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.Role.role_name,
      },
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
    include: [
      {
        model: Role,
      },
    ],
    raw: true,
    nest: true,
  });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const payload = {
      id: user.id,
      role: user.Role.role_name,
      email: user.email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: [
        {
          id: user.id,
          email: user.email,
          role: user.Role.role_name,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      ],
    });
  } else {
    res.status(401).json({
      success: false,
      message: "incorrect password",
    });
  }
};
