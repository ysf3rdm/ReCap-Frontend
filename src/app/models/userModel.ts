import { Claim } from './claim';
import { TokenModel } from './tokenModel';
import { User } from './user';

export interface UserModel extends TokenModel, Claim, User {}
