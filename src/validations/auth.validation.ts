import { check } from 'express-validator';

const login = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail({ gmail_remove_dots: false }),
  check('password', 'Please enter a password').notEmpty().trim(),
];

export const authValidation = { login };
