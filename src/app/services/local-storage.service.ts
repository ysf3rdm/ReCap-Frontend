import { Injectable } from '@angular/core';
import { Claim } from '../models/claim';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  set(user: UserModel) {
    localStorage.setItem('expiration', user.expiration);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('userId', user.userId.toString());
  }
  getFirstName() {
    return localStorage.getItem('firstName');
  }
  getLastName() {
    return localStorage.getItem('lastName');
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  logOut() {
    localStorage.clear();
  }
  setClaims(claim: Claim[]) {
    //   if (claim[0].name === undefined) {
    //     localStorage.setItem('claim', '');
    //   } else {
    //     localStorage.setItem('claim', claim[0].name);
    //   }
    localStorage.setItem('claim', claim[0]?.name);
  }
  getExpiration() {
    return localStorage.getItem('expiration');
  }
}
