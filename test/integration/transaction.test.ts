import 'jest';
import supertest, { Request, SuperTest } from 'supertest';
import { App } from '../../src/app';
import { genericHelper, transactionHelper } from '../helpers';

const USER_1_ID = '550e8400-e29b-41d4-a716-446655440000';
const USER_2_ID = '550e8400-e29b-41d4-a716-446655440001';
const USER_3_ID = '550e8400-e29b-41d4-a716-446655440002';
const NON_EXISTENT_USER_ID = 'df3d5f8c-dc80-4132-aa3e-0670f0d39cb4';

let app: App;
let request: SuperTest<Request>;

describe('/api/transactions', () => {
  beforeAll(() => {
    app = new App();
    request = supertest(app.server);
  });

  beforeEach(async () => {
    await genericHelper.destroyDB();
  });

  describe('POST /api/transactions', () => {
    it('should create a transaction successfully', async () => {
      const response = await transactionHelper.createTransaction(request, {
        origin: USER_1_ID,
        destination: USER_2_ID,
        amount: 10000,
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.transactionId).toBeDefined();
    });

    it('should return error when user does not exist', async () => {
      const response = await transactionHelper.createTransaction(request, {
        origin: NON_EXISTENT_USER_ID,
        destination: USER_2_ID,
        amount: 10000,
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/transactions?userId=', () => {
    it('should return transactions for a user successfully', async () => {
      await transactionHelper.createTransaction(request, {
        origin: USER_1_ID,
        destination: USER_2_ID,
        amount: 10000,
      });

      await transactionHelper.createTransaction(request, {
        origin: USER_2_ID,
        destination: USER_3_ID,
        amount: 5000,
      });

      const response = await transactionHelper.getTransactionsByUserId(request, USER_1_ID);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((transaction: any) => {
        expect(transaction.origin === USER_1_ID || transaction.destination === USER_1_ID).toBe(true);
      });
    });

    it('should return empty array when user has no transactions', async () => {
      const response = await transactionHelper.getTransactionsByUserId(request, USER_1_ID);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });
});
