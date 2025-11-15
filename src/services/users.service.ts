import * as crypto from 'crypto';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { commonUtils } from '../utils';
import { UserDTO } from '../types/DTOs';
import { UserSignupRequest, UserUpdateRequest } from '../types/requests';
import { mailerService } from '.';
import { ApiError } from '../enums';
import { CustomError } from '../lib';
import { UserModel, SessionModel } from '../models';

const SALT_ROUNDS = 10;

const generateConfirmEmailToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, (err, buf) => {
      if (err) {
        return reject(err);
      }
      const token = buf.toString('hex');
      return resolve(token);
    });
  });
};

const getUserByToken = async (token: string): Promise<UserDTO> => {
  const session = await SessionModel.findOne({
    where: {
      token,
      expiredAt: {
        [Op.gt]: new Date()
      },
    },
  });

  if (!session) {
    throw new CustomError(ApiError.Auth.EXPIRED_TOKEN);
  }

  const user = await UserModel.findByPk(session.userId, {});

  const userDTO = plainToClass(UserDTO, user);

  return userDTO;
};

const createUser = async (userData: UserSignupRequest): Promise<UserDTO> => {
  userData.email = commonUtils.normalizeEmail(userData.email);
  const hashedPassword = await hashPassword(userData.password);

  const existingUser = await UserModel.findOne({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new CustomError(ApiError.Auth.USER_ALREADY_EXISTS);
  }

  const verifyEmailToken = await generateConfirmEmailToken();

  const newUser = await UserModel.create({
    ...userData,
    verifyEmailToken,
    password: hashedPassword,
  });

  const userDTO = plainToClass(UserDTO, newUser);

  await mailerService.newUser(userDTO, verifyEmailToken);

  return userDTO;
};

const updateUser = async (userId: string, newUser: UserUpdateRequest): Promise<UserDTO> => {
  const user = await UserModel.update(newUser, {
    where: { userId },
    returning: true,
  });

  const userDTO = plainToClass(UserDTO, user[1][0].get());

  return userDTO;
};

const getUserById = async (userId: string): Promise<UserDTO> => {
  const user = await UserModel.findByPk(userId);

  const userDTO = plainToClass(UserDTO, user);

  return userDTO;
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const userService = {
  generateConfirmEmailToken,
  getUserByToken,
  createUser,
  updateUser,
  getUserById,
  hashPassword,
  comparePasswords,
};
