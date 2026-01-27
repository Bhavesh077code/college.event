

import * as yup from "yup";

export const userSchema = yup.object({
  firstname: yup
    .string()
    .trim()
    .min(3, "Firstname must be at least 3 characters")
    .required("Username is required"),

  lastname: yup
    .string()
    .trim()
    .min(3, "Lastname must be at least 3 characters")
    .required("Username is required"),


  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const validateUser = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors
    });
  }
};
