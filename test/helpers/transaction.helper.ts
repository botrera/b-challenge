import { Request, Response, SuperTest } from 'supertest';
import { genericFactory } from '../factories';

const createTransaction = async <T extends object>(
  request: SuperTest<Request>,
  transaction: T,
): Promise<Response> =>
  await request.post('/api/transactions').set(genericFactory.buildHeader()).send(transaction);

const getTransactionsByUserId = async (request: SuperTest<Request>, userId: string): Promise<Response> =>
  await request.get(`/api/transactions?userId=${userId}`).set(genericFactory.buildHeader()).send();

const approveTransaction = async (request: SuperTest<Request>, transactionId: string): Promise<Response> =>
  await request.patch(`/api/transactions/${transactionId}/approve`).set(genericFactory.buildHeader()).send();

const rejectTransaction = async (request: SuperTest<Request>, transactionId: string): Promise<Response> =>
  await request.patch(`/api/transactions/${transactionId}/reject`).set(genericFactory.buildHeader()).send();

export const transactionHelper = {
  createTransaction,
  getTransactionsByUserId,
  approveTransaction,
  rejectTransaction,
};
