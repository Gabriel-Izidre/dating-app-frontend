export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  preference: 'male' | 'female';
}
