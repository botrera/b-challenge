import { Op } from 'sequelize';
import { addMonths } from 'date-fns';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ApiError } from '../enums';
import { RestorePasswordModel, UserModel, SessionModel } from '../models';
import { CustomError } from '../lib';
import { mailerService } from '.';

const SALT_ROUNDS = 10;
const restorePasswordTokenLife = 30 * 60 * 1000; // 30 minutes

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const createRestorePasswordToken = async (): Promise<string> => {
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

const logout = async (token: string): Promise<void> => {
  await SessionModel.destroy({
    where: {
      token,
    },
  });
};

const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({
    where: {
      email,
    },
    raw: true,
  });

  if (!user || !(await comparePasswords(password, user.password))) {
    throw new CustomError(ApiError.Auth.BAD_AUTH);
  }

  const activeSession: SessionModel = await getActiveSession(user.userId);

  if (activeSession) {
    await logout(activeSession.token);
  }

  const token = await createSession(user.userId);

  delete user.password;

  return { user, token };
};

const createSession = async (userId: number) => {
  await SessionModel.destroy({
    where: {
      userId,
    },
  });

  const token = await generateToken();

  const session = await SessionModel.create({
    userId,
    token,
    expiredAt: addMonths(new Date(), 1)
  });

  return session.token;
};

/* eslint-disable */
const generateToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    require('crypto').randomBytes(48, (err, buffer) => {
      resolve(buffer.toString('hex'));
    });
  });
};
/* eslint-enable */

const comparePasswords = async (password: string, hashedPassword: string) => {
  if (!password || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(password, hashedPassword);
};

const forgotPassword = async (email: string) => {
  const user = await UserModel.findOne({
    where: {
      email,
      deletedAt: { [Op.eq]: null },
    },
  });

  if (!user) {
    throw new CustomError(ApiError.User.USER_DOES_NOTEXIST);
  }

  let token: string;
  let i = 0;
  while (i < 10) {
    token = await createRestorePasswordToken();
    const tokenExist = await RestorePasswordModel.count({
      where: {
        token,
        used: false,
        createdAt: { [Op.gt]: new Date(Date.now() - restorePasswordTokenLife) },
      },
    });
    if (!tokenExist) {
      await RestorePasswordModel.create({
        userId: user.userId,
        token,
        used: false,
      });
      break;
    }
    i++;
  }

  if (i === 10) {
    throw new CustomError(ApiError.Auth.INVALID_RESTORE_PASSWORD_TOKEN);
  }

  await mailerService.sendForgotPasswordMail(email, token, user.firstName);
};

const restorePassword = async (token: string, newPassword: string) => {
  const restorePasswordToken = await RestorePasswordModel.findOne({
    where: {
      token,
      used: false,
      createdAt: { [Op.gte]: new Date(Date.now() - restorePasswordTokenLife) },
    },
    include: [UserModel],
  });

  const user = restorePasswordToken.user;

  if (!user) {
    throw new CustomError(ApiError.Auth.INVALID_RESTORE_PASSWORD_TOKEN);
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  restorePasswordToken.used = true;
  await restorePasswordToken.save();

  await SessionModel.destroy({ where: { userId: user.userId } });
};

const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const user = await UserModel.findByPk(userId);

  if (!(await comparePasswords(oldPassword, user.password))) {
    throw new CustomError(ApiError.User.WRONG_PASSWORD);
  }

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
};

const getActiveSession = async (userId: number): Promise<SessionModel> => {
  const existingSession = await SessionModel.findOne({
    where: {
      userId,
      expiredAt: {
        [Op.gte]: new Date(),
      },
    },
  });

  return existingSession;
};

export const authService = {
  logout,
  login,
  createSession,
  generateToken,
  comparePasswords,
  restorePassword,
  forgotPassword,
  changePassword,
};
