import { TokenModel } from './tokenModel';

export interface UserModel extends TokenModel {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
