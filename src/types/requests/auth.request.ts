interface LoginRequest {
  password: string;
  email: string;
}

interface RestorePasswordRequest {
  password: string;
  token: string;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export { LoginRequest, RestorePasswordRequest, ChangePasswordRequest };
