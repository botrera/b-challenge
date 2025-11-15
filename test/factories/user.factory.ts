import { genericFactory } from '.';

const user = {
  email: 'test@example.com',
  password: 'password',
  firstName: 'Philip',
  lastName: 'Fry',
};

const buildUser = (attributes: any = {}): any => genericFactory.buildRequest(attributes, user);

export const userFactory = {
  buildUser,
};
