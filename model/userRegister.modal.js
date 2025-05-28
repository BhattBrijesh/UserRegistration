const mongoose = require("mongoose");
const userRegisterSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      max: [50, "maximum 50 character are allowed"],
      min: [1, "minimum 1 character are allowed"],
    },
    lastName: {
      type: String,
      max: [50, "maximum 50 character are allowed"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (phone) {
          return /^\d{10}$/.test(phone);
        },
        message: (props) => `${props.value} Please fill a valid phone number!`,
      },
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: (props) => `${props.value} Please fill a valid email address!`,
      },
      required: [true, "email is required"],
    },
    password: {
      type: String,
      max: [50, "maximum 50 character are allowed"],
      min: [5, "minimum 5 character are allowed"],
      required: true,
    },
    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      max: [50, "maximum 50 character are allowed"],
    },
  },
  { timestamps: true }
);
const userRegisterModal = mongoose.model("userRegister", userRegisterSchema);
module.exports = userRegisterModal;
