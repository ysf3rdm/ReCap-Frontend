import { Claim } from './claim';
import { TokenModel } from './tokenModel';

export interface UserModel extends TokenModel, Claim {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
