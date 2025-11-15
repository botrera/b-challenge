import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../lib';
import { transactionService } from '../services';
import { TransactionRequest } from 'src/types/requests';

const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: TransactionRequest = req.body;

    const transaction = await transactionService.createTransaction(request);

    res.send(new CustomResponse(true, transaction));
  } catch (error) {
    next(error);
  }
};

const approveTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const transaction = await transactionService.approveTransaction(id);

    res.send(new CustomResponse(true, transaction));
  } catch (error) {
    next(error);
  }
};

const rejectTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const transaction = await transactionService.rejectTransaction(id);

    res.send(new CustomResponse(true, transaction));
  } catch (error) {
    next(error);
  }
};

const getTransactionsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.query.userId as string;
    const transactions = await transactionService.getTransactionsByUserId(userId);

    res.send(new CustomResponse(true, transactions));
  } catch (error) {
    next(error);
  }
};

export const transactionController = {
  createTransaction,
  approveTransaction,
  rejectTransaction,
  getTransactionsByUserId,
};
