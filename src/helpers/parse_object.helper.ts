import { UserUpdateRequest, UserSignupRequest } from '../types/requests';
import { deleteObjectUtils } from '../utils';

/**
 * Pass from the body object to an object of type User update removing null elements
 */
const parseToUserUpdateRequest = (body: any): UserUpdateRequest => {
  const user: UserUpdateRequest = {
    firstName: body.name,
    lastName: body.lastName,
    phone: body.phone,
    address: body.address,
    birthdate: body.birthDate,
    city: body.city,
    country: body.country,
  };

  deleteObjectUtils.deleteObjectUndefined(user);
  return user;
};

/**
 * Pass from the body object to an object of type User signup removing null elements
 */
const parseToUserSignupRequest = (body: any): UserSignupRequest => {
  const user: UserSignupRequest = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
  };

  deleteObjectUtils.deleteObjectUndefined(user);
  return user;
};

export const parseObjectHelper = {
  parseToUserUpdateRequest,
  parseToUserSignupRequest,
};
