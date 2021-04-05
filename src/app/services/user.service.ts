import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}
  getUser(mail: string): Observable<SingleResponseModel<RegisterModel>> {
    return this.httpClient.get<SingleResponseModel<RegisterModel>>(
      this.apiUrl + 'users/getbymail'
    );
  }
}
