exports.validateCreatingUser = (user) => {
  const {
    firstName = "",
    email = "",
    jobRole = "",
    password = "",
  } = user || {};
  const error = [];
  if (!firstName?.trim()) {
    error.push("first name is required");
  }
  if (!email?.trim()) {
    error.push("email  is required");
  }
  if (!jobRole?.trim()) {
    error.push("job role is required");
  }
  if (!password?.trim()) {
    error.push("password is required");
  }
  return error;
};
exports.validateLoginUser = (user) => {
  const { email = "", password = "" } = user || {};
  const error = [];
  if (!email?.trim()) error.push("email is required");
  if (!password?.trim()) error.push("password is required");

  return error;
};
