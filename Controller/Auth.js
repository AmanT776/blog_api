const bcrypt = require("bcrypt");
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
