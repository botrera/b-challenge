import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../types/generic';
import { ApiError } from '.';

const customErrors: CustomError[] = [];

// User
customErrors[ApiError.User.ORIGIN_DOES_NOTEXIST] = {
  message: 'User origin does not exist',
  showMessage: {
    EN: 'User origin does not exist',
    ES: 'El usuario origin no existe',
  },
  HTTPStatusCode: StatusCodes.NOT_FOUND,
};

customErrors[ApiError.User.DESTINATION_DOES_NOTEXIST] = {
  message: 'User destination does not exist',
  showMessage: {
    EN: 'User destination does not exist',
    ES: 'El usuario destino no existe',
  },
  HTTPStatusCode: StatusCodes.NOT_FOUND,
};

// Transaction
customErrors[ApiError.Transaction.INVALID_AMOUNT] = {
  message: 'Invalid transaction amount',
  showMessage: {
    EN: 'Invalid transaction amount',
    ES: 'Monto de transacción inválido',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
};

customErrors[ApiError.Transaction.INSUFFICIENT_BALANCE] = {
  message: 'Insufficient balance',
  showMessage: {
    EN: 'Insufficient balance',
    ES: 'Saldo insuficiente',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
};

customErrors[ApiError.Transaction.ORIGIN_EQUALS_DESTINATION] = {
  message: 'Origin and destination cannot be the same',
  showMessage: {
    EN: 'Origin and destination cannot be the same',
    ES: 'El origen y el destino no pueden ser el mismo',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
};

customErrors[ApiError.Transaction.CREATE_FAILED] = {
  message: 'Failed to create transaction',
  showMessage: {
    EN: 'Failed to create transaction',
    ES: 'Error al crear la transacción',
  },
  HTTPStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
};

customErrors[ApiError.Transaction.UPDATE_FAILED] = {
  message: 'Failed to update transaction',
  showMessage: {
    EN: 'Failed to update transaction',
    ES: 'Error al modificar la transacción',
  },
  HTTPStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
};

customErrors[ApiError.Transaction.NOT_FOUND] = {
  message: 'Transaction not found',
  showMessage: {
    EN: 'Transaction not found',
    ES: 'Transacción no encontrada',
  },
  HTTPStatusCode: StatusCodes.NOT_FOUND,
};

customErrors[ApiError.Transaction.NOT_PENDING] = {
  message: 'Transaction is not pending',
  showMessage: {
    EN: 'Transaction is not pending',
    ES: 'La transacción no está pendiente',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
};

export { customErrors };
