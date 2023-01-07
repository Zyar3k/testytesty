const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// const register = async (req, res) => {
//   const newUser = await User.create({ ...req.body });
//   const token = newUser.createJWT();
//   res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
// };

const login = async (req, res) => {
  const { email, password, id } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid email or password");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid email or password");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, id: user._id }, token });
};

module.exports = {
  // register,
  login,
};
