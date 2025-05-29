const { default: mongoose } = require("mongoose");
const userRegisterModal = require("../model/userRegister.modal");
const {
  validateCreatingUser,
  validateLoginUser,
} = require("../validators/createUser.validator");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.handleCreateUser = async (req, res) => {
  try {
    const validateError = validateCreatingUser(req.body);
    if (validateError?.length > 0) {
      return res.status(400).json({ message: validateError?.join(", ") });
    }

    const {
      firstName = "",
      lastName = "",
      phone = "",
      email = "",
      password = "",
      jobRole = "",
    } = req.body || {};
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await userRegisterModal.create({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: hashPassword,
      jobRole: jobRole,
    });
    return res
      .status(201)
      .json({ message: "user created successfully", data: createUser });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
exports.handleGetUserDetail = async (req, res) => {
  try {
    const urlId = req?.query?.id;

    if (urlId) {
      if (!mongoose.Types.ObjectId.isValid(urlId)) {
        return res.status(400).json({ message: "enter valid user id" });
      }
      if (!userId) {
        return res.status(400).json({ message: "user id is required" });
      }
      const getAllUser = await userRegisterModal.findById(urlId);
      return res
        .status(200)
        .json({ message: "user fetched successfully", data: getAllUser });
    }
    const getAllUser = await userRegisterModal.find();
    return res
      .status(200)
      .json({ message: "user fetched successfully", data: getAllUser });
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
};
exports.handleUserLogin = async (req, res) => {
  const { email = "", password = "" } = req.body || {};
  const ValidatorError = validateLoginUser(req.body);
  if (ValidatorError?.length > 0) {
    return res.status(400).json({ message: ValidatorError?.join(", ") });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    const user = await userRegisterModal.findOne({ email });

    if (!user) {
      return res
        .send(400)
        .json({ message: "User with this email does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const SECRET_kEY = process?.env?.SECRET_kEY;
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        data: user,
      },
      SECRET_kEY
    );

    return res
      .status(200)
      .json({ message: "Login successful", data: { user, token } });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
