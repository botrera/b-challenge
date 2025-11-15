import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../types/generic';
import { ApiError } from '.';

const customErrors: CustomError[] = [];

// Auth
customErrors[ApiError.Auth.BAD_AUTH] = {
  message: 'Bad auth',
  showMessage: {
    EN: 'Incorrect email/password',
    ES: 'Email o contraseña incorrectos',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.BAD_AUTH]}`,
};

customErrors[ApiError.Auth.UNAUTHORIZED] = {
  message: 'Unauthorized',
  showMessage: {
    EN: 'Unauthorized',
    ES: 'No autorizado',
  },
  HTTPStatusCode: StatusCodes.UNAUTHORIZED,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.UNAUTHORIZED]}`,
};

customErrors[ApiError.Auth.USER_ALREADY_EXISTS] = {
  message: 'User already exists',
  showMessage: {
    EN: 'User already exists',
    ES: 'El usuario ya existe',
  },
  HTTPStatusCode: StatusCodes.CONFLICT,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.USER_ALREADY_EXISTS]}`,
};

customErrors[ApiError.Auth.BAD_EMAIL_FORMAT] = {
  message: 'Bad email format',
  showMessage: {
    EN: 'Email is not valid',
    ES: 'Email no es válido',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.BAD_EMAIL_FORMAT]}`,
};

customErrors[ApiError.Auth.EMAIL_NEEDED] = {
  message: 'Email needed',
  showMessage: {
    EN: 'Email needed',
    ES: 'Email requerido',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.EMAIL_NEEDED]}`,
};

customErrors[ApiError.Auth.BAD_FB_AUTH] = {
  message: 'Bad fb auth, maybe the token is expired',
  showMessage: {
    EN: 'There was a problem when trying to connect to facebook. Try again later',
    ES: 'Ha ocurrido un problema intentando conectarse con facebook. Pruebe mas tarde',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.BAD_FB_AUTH]}`,
};

customErrors[ApiError.Auth.EMAIL_DOES_NOT_EXIST] = {
  message: 'Email does not exist',
  showMessage: {
    EN: 'Email does not exist',
    ES: 'El email no existe',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.EMAIL_DOES_NOT_EXIST]}`,
};

customErrors[ApiError.Auth.INVALID_RESTORE_PASSWORD_TOKEN] = {
  message: 'Invalid reset password token',
  showMessage: {
    EN: 'Invalid reset password token',
    ES: 'Token inválido para resetear la contraseña',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.INVALID_RESTORE_PASSWORD_TOKEN]}`,
};

customErrors[ApiError.Auth.INVALID_CONFIRM_EMAIL_TOKEN] = {
  message: 'Invalid confirm email token',
  showMessage: {
    EN: 'Invalid confirm email token',
    ES: 'Token inválido para confirmar el email',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.INVALID_CONFIRM_EMAIL_TOKEN]}`,
};

customErrors[ApiError.Auth.EXPIRED_TOKEN] = {
  message: 'Expired token',
  showMessage: {
    EN: 'Your session has expired',
    ES: 'Su sesión ha expirado',
  },
  HTTPStatusCode: StatusCodes.UNAUTHORIZED,
  errorName: `auth:${ApiError.Auth[ApiError.Auth.EXPIRED_TOKEN]}`,
};

// Server
customErrors[ApiError.Server.TOO_FEW_PARAMS] = {
  message: 'Too few parameters',
  showMessage: {
    EN: 'Too few parameters',
    ES: 'Faltan parametros',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Server.TOO_FEW_PARAMS]}`,
};

customErrors[ApiError.Server.PARAMS_REQUIRED] = {
  message: 'Some body parameters are missing or are incorrect',
  showMessage: {
    EN: 'Some body parameters are missing or are incorrect',
    ES: 'Faltan o son incorrectos algunos parametros de la solicitud',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.Server.PARAMS_REQUIRED]}`,
};


// User
customErrors[ApiError.User.UNSUBSCRIBED] = {
  message: 'Unsubscribed',
  showMessage: {
    EN: 'You have to buy OPEN to perfom this action',
    ES: 'Debes comprar OPEN App para realizar esta acción',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.User.UNSUBSCRIBED]}`,
};

customErrors[ApiError.User.USER_DOES_NOTEXIST] = {
  message: 'User does not exist',
  showMessage: {
    EN: 'User does not exist',
    ES: 'El usuario no existe',
  },
  HTTPStatusCode: StatusCodes.NOT_FOUND,
  errorName: `auth:${ApiError.Auth[ApiError.User.USER_DOES_NOTEXIST]}`,
};

customErrors[ApiError.User.WRONG_PASSWORD] = {
  message: 'Wrong password',
  showMessage: {
    EN: 'Wrong password',
    ES: 'Contraseña incorrecta',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.User.WRONG_PASSWORD]}`,
};

customErrors[ApiError.User.PASSWORD_TOO_SHORT] = {
  message: 'Password has to be at least 6 characters long',
  showMessage: {
    EN: 'Password has to be at least 6 characters long',
    ES: 'La contraseña debe tener un largo de al menos 6',
  },
  HTTPStatusCode: StatusCodes.BAD_REQUEST,
  errorName: `auth:${ApiError.Auth[ApiError.User.PASSWORD_TOO_SHORT]}`,
};

export { customErrors };
