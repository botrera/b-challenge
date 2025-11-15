import { Request, Response, SuperTest } from 'supertest';
import { genericFactory } from '../factories';

const createUser = async <T extends object>(request: SuperTest<Request>, user: T): Promise<Response> =>
  await request.post('/api/v1/users/signup').set(genericFactory.buildHeader()).send(user);

const login = async <T extends object>(request: SuperTest<Request>, user: T): Promise<Response> =>
  await request.post('/api/v1/users/login').set(genericFactory.buildHeader()).send(user);

const logout = async (request: SuperTest<Request>, authToken: string): Promise<Response> =>
  await request.post('/api/v1/users/logout').set(
    genericFactory.buildHeader({
      Authorization: `Bearer ${authToken}`,
    }),
  );

const getUser = async (request: SuperTest<Request>, userId: string, authToken?: string): Promise<Response> =>
  await request
    .get(`/api/v1/users/${userId}`)
    .set(
      genericFactory.buildHeader({
        Authorization: `Bearer ${authToken}`,
      }),
    )
    .send();

const changePassword = async <T extends object>(
  request: SuperTest<Request>,
  payload: T,
  authToken?: string,
): Promise<Response> =>
  await request
    .post('/api/v1/users/change-pwd')
    .set(
      genericFactory.buildHeader({
        Authorization: `Bearer ${authToken}`,
      }),
    )
    .send(payload);

export const userHelper = {
  createUser,
  login,
  logout,
  getUser,
  changePassword,
};
