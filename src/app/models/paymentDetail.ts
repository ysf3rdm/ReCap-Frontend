import { CreditCard } from './creditCard';
import { Rental } from './rental';

export interface PaymentDetail {
  creditCard: CreditCard;
  rental: Rental;
}
