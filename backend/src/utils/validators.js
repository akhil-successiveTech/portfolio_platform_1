import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 chars"),
  body("email").isEmail().withMessage("Enter valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
  body("role").isIn(["student", "organisation"]).withMessage("Invalid role"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Enter valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// middleware to check errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
