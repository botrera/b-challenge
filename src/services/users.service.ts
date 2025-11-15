import { UserModel } from '../models';

const getUserById = async (userId: string): Promise<UserModel | null> => {
  const user = await UserModel.findByPk(userId);
  return user;
};

export const userService = {
  getUserById,
};
