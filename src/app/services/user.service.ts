import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { ListResponseModel } from '../models/listResponseModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserModel } from '../models/userModel';

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
  getClaims(user: User): Observable<ListResponseModel<Claim>> {
    return this.httpClient.post<ListResponseModel<Claim>>(
      this.apiUrl + 'users/getclaims',
      user
    );
  }
}
