interface UserSignupRequest {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthdate?: Date;
  country?: string;
  city?: string;
  address?: string;
  profilePictureUrl?: string;
}

export { UserSignupRequest, UserUpdateRequest };
