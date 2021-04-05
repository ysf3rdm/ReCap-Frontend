import { Injectable } from '@angular/core';
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
}
