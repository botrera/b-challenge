import { plainToClass } from 'class-transformer';
import { UserDTO } from '../types/DTOs';
import { UserSignupRequest, UserUpdateRequest } from '../types/requests';
import { mailerService } from '.';
import { ApiError } from '../enums';
import { CustomError } from '../lib';
import { UserModel } from '../models';

const getUserById = async (userId: string): Promise<UserDTO> => {
  const user = await UserModel.findByPk(userId);

  const userDTO = plainToClass(UserDTO, user);

  return userDTO;
};

export const userService = {

  getUserById,

};
