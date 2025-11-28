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
    const { id } = await User.findOne({
      where: {
        email: email,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Account Successfully Created",
      data: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
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
        attributes: ["role_name"],
      },
    ],
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
      email: user.email,
    };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      success: true,
      message: "login successful",
      data: [
        {
          id: user.id,
          email: user.email,
          role: user.Role.dataValues.role_name,
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
