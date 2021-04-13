import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardModel } from '../models/creditCardModel';
import { ListResponseModel } from '../models/listResponseModel';
import { PaymentDetail } from '../models/paymentDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44368/api/';

  constructor(private httpClient: HttpClient) {}

  saveCard(payment: CreditCardModel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'payments/savecard';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }
  delete(card: CreditCardModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'payments/deletecard',
      card
    );
  }
  getCardByCardId(Id: number): Observable<ListResponseModel<CreditCardModel>> {
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(
      this.apiUrl + 'payments/getcardbycardid?Id=' + Id
    );
  }
  getCardByCustomer(
    customerId: number
  ): Observable<ListResponseModel<CreditCardModel>> {
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(
      this.apiUrl + 'payments/getcardbyid?customerId=' + customerId
    );
  }
}
