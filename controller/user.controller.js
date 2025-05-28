const { default: mongoose } = require("mongoose");
const userRegisterModal = require("../model/userRegister.modal");
const { validateCreatingUser } = require("../validators/createUser.validator");
const bcrypt = require("bcryptjs");

exports.handleCreateUser = async (req, res) => {
  try {
    const validateError = validateCreatingUser(req.body);
    if (validateError?.length > 0) {
      return res.status(400).json({ message: validateError.join(", ") });
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
    console.log("urlId--", urlId);
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
