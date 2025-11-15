import { check } from 'express-validator';

const forgotPassword = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail({ gmail_remove_dots: false }),
];

const changePassword = [check('password', 'Please enter a password').notEmpty().trim()];

const signupUser = [
  check('firstName', 'Please enter a firt name').notEmpty().trim(),
  check('lastName', 'Please enter a last name').notEmpty().trim(),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail({ gmail_remove_dots: false }),
  check('password', 'Please enter a password').notEmpty().trim(),
  check('phone', 'Please enter a phone number').notEmpty().trim(),
];

export const userValidation = { forgotPassword, changePassword, signupUser };
