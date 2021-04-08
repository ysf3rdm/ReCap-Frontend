import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerAdd } from '../models/customerAdd';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerDetail(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomersdetail';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerbyid?Id=' + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  add(customer: CustomerAdd): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'customers/add',
      customer
    );
  }
}
