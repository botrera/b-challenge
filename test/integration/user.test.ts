import 'jest';
import supertest, { Request, SuperTest } from 'supertest';
import { App } from '../../src/app';
import { userFactory } from '../factories';
import { genericHelper, userHelper } from '../helpers';

const user = userFactory.buildUser({ email: 'test@example.com' });
const user2 = userFactory.buildUser({ email: 'test2@example.com' });
let app: App;

describe('/api/v1/users', () => {
  let request: SuperTest<Request>;

  beforeAll(() => {
    app = new App();
    request = supertest(app.server);
  });

  describe('POST /signup', (): void => {
    beforeEach(async () => {
      await genericHelper.destroyDB();
    });

    it('should return 200 if mail is not in use', async () => {
      const response = await userHelper.createUser(request, user);
      expect(response.status).toBe(200);
    });

    it('should return a user object if everything is ok', async () => {
      await userHelper.createUser(request, user);
      const loginResponse = await userHelper.login(request, user);
      const userData = loginResponse.body.data;

      expect(userData.status).toBe(200);

      expect(userData.user).toMatchObject({ email: user.email });
    });

    it('should return logout successfuly', async () => {
      await userHelper.createUser(request, user);
      const loginResponse = await userHelper.login(request, user);

      expect(loginResponse.status).toBe(200);

      const token: string = loginResponse.body.data.token;
      const logoutResponse = await userHelper.logout(request, token);

      expect(logoutResponse.status).toBe(200);
    });

    it('should return 400 if using an existing mail', async () => {
      await userHelper.createUser(request, user);
      const response = await userHelper.createUser(request, user);

      expect(response.status).toBe(409);
    });

    it('should return 400 if data provided to endpoint is wrong', async () => {
      const response = await userHelper.createUser(request, {
        email: user.email,
        password: user.password,
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Edit user', () => {
    beforeAll(async () => {
      await genericHelper.destroyDB();
      await userHelper.createUser(request, user2);
    });

    it('Should change password', async () => {
      let loginResponse = await userHelper.login(request, user2);

      const token: string = loginResponse.body.data.token;

      expect(loginResponse.status).toBe(200);
      const payload = {
        oldPassword: user2.password,
        newPassword: 'newPwd',
      };

      let changePasswordResponse = await userHelper.changePassword(request, payload);
      expect(changePasswordResponse.status).toBe(401);

      changePasswordResponse = await userHelper.changePassword(request, payload, token);
      expect(changePasswordResponse.status).toBe(200);

      loginResponse = await userHelper.login(request, user2);
      expect(loginResponse.status).toBe(400);

      user2.password = payload.newPassword;
      loginResponse = await userHelper.login(request, user2);

      expect(loginResponse.status).toBe(200);
    });
  });
});
