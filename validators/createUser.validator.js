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
  } else if (!email?.trim()) {
    error.push("email  is required");
  } else if (!jobRole?.trim()) {
    error.push("job role is required");
  } else if (!password?.trim()) {
    error.push("password is required");
  }
  return error;
};
