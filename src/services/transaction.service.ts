import { Transaction as SequelizeTransaction, Op } from 'sequelize';
import { plainToClass } from 'class-transformer';
import { TransactionDTO } from '../types/DTOs';
import { TransactionModel, sequelize } from '../models';
import { TransactionRequest } from '../types/requests';
import { userService } from './';
import { Status, ApiError } from '../enums';
import { CustomError, logger } from '../lib';

const getTransactions = async (): Promise<TransactionDTO[]> => {
  const transaction = await TransactionModel.findAll();

  const transactionDTO = plainToClass(TransactionDTO, transaction);

  return transactionDTO;
};

const getTransactionById = async (transactionId: string): Promise<TransactionModel> => {
  const transaction = await TransactionModel.findByPk(transactionId);

  return transaction;
};

const createTransaction = async (transactionRequest: TransactionRequest): Promise<TransactionDTO> => {
  const sequelizeTransaction: SequelizeTransaction = await sequelize().transaction();

  try {
    if (transactionRequest.amount <= 0) {
      throw new CustomError(ApiError.Transaction.INVALID_AMOUNT);
    }

    if (transactionRequest.origin === transactionRequest.destination) {
      throw new CustomError(ApiError.Transaction.ORIGIN_EQUALS_DESTINATION);
    }

    const origin = await userService.getUserById(transactionRequest.origin);

    if (!origin) {
      throw new CustomError(ApiError.User.ORIGIN_DOES_NOTEXIST);
    }

    const destination = await userService.getUserById(transactionRequest.destination);

    if (!destination) {
      throw new CustomError(ApiError.User.DESTINATION_DOES_NOTEXIST);
    }

    if (origin.balance < transactionRequest.amount) {
      throw new CustomError(ApiError.Transaction.INSUFFICIENT_BALANCE);
    }

    const status = transactionRequest.amount > 50000 ? Status.PENDING : Status.CONFIRMED;

    const newTransaction = await TransactionModel.create(
      {
        ...transactionRequest,
        status,
      },
      { transaction: sequelizeTransaction },
    );

    if (status === Status.CONFIRMED) {
      origin.balance = origin.balance - transactionRequest.amount;
      destination.balance = destination.balance + transactionRequest.amount;

      await origin.save({ transaction: sequelizeTransaction });
      await destination.save({ transaction: sequelizeTransaction });
    }

    await sequelizeTransaction.commit();

    return plainToClass(TransactionDTO, newTransaction);
  } catch (err) {
    await sequelizeTransaction.rollback();
    logger.error(err);
    throw new CustomError(ApiError.Transaction.CREATE_FAILED);
  }
};

const approveTransaction = async (transactionId: string): Promise<TransactionDTO> => {
  const sequelizeTransaction: SequelizeTransaction = await sequelize().transaction();

  try {
    const transaction = await getTransactionById(transactionId);

    if (!transaction) {
      throw new CustomError(ApiError.Transaction.NOT_FOUND);
    }

    if (transaction.status !== Status.PENDING) {
      throw new CustomError(ApiError.Transaction.NOT_PENDING);
    }

    const origin = await userService.getUserById(transaction.origin);

    if (!origin) {
      throw new CustomError(ApiError.User.ORIGIN_DOES_NOTEXIST);
    }

    const destination = await userService.getUserById(transaction.destination);

    if (!destination) {
      throw new CustomError(ApiError.User.DESTINATION_DOES_NOTEXIST);
    }

    if (origin.balance < transaction.amount) {
      throw new CustomError(ApiError.Transaction.INSUFFICIENT_BALANCE);
    }

    origin.balance = origin.balance - transaction.amount;
    destination.balance = destination.balance + transaction.amount;

    await origin.save({ transaction: sequelizeTransaction });
    await destination.save({ transaction: sequelizeTransaction });

    transaction.status = Status.CONFIRMED;
    await transaction.save({ transaction: sequelizeTransaction });

    await sequelizeTransaction.commit();

    return plainToClass(TransactionDTO, transaction);
  } catch (err) {
    await sequelizeTransaction.rollback();
    logger.error(err);
    throw new CustomError(ApiError.Transaction.UPDATE_FAILED);
  }
};

const rejectTransaction = async (transactionId: string): Promise<TransactionDTO> => {
  const sequelizeTransaction: SequelizeTransaction = await sequelize().transaction();

  try {
    const transaction = await getTransactionById(transactionId);

    if (!transaction) {
      throw new CustomError(ApiError.Transaction.NOT_FOUND);
    }

    if (transaction.status !== Status.PENDING) {
      throw new CustomError(ApiError.Transaction.NOT_PENDING);
    }

    transaction.status = Status.REJECTED;
    await transaction.save({ transaction: sequelizeTransaction });

    await sequelizeTransaction.commit();

    return plainToClass(TransactionDTO, transaction);
  } catch (err) {
    await sequelizeTransaction.rollback();
    logger.error(err);
    throw new CustomError(ApiError.Transaction.UPDATE_FAILED);
  }
};

const getTransactionsByUserId = async (userId: string): Promise<TransactionDTO[]> => {
  const transactions = await TransactionModel.findAll({
    where: {
      [Op.or]: [{ origin: userId }, { destination: userId }],
    },
    order: [['createdAt', 'DESC']],
  });

  return plainToClass(TransactionDTO, transactions);
};

export const transactionService = {
  getTransactions,
  getTransactionById,
  createTransaction,
  approveTransaction,
  rejectTransaction,
  getTransactionsByUserId,
};
