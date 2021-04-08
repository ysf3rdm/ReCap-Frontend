import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { UserModel } from 'src/app/models/userModel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customer: Customer;
  firstName = '';
  lastName = '';
  email = '';
  claims = '';
  userUpdateForm: FormGroup;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
    this.getNamesAndEmail();
    this.createUserUpdateForm();
  }
  getNamesAndEmail() {
    this.firstName = this.localStorageService.getFirstName();
    this.lastName = this.localStorageService.getLastName();
    this.email = this.localStorageService.getEmail();
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  getCustomer() {
    this.customerService
      .getCustomerByUserId(parseInt(localStorage.getItem('userId')))
      .subscribe((response) => {
        this.customer = response.data[0];
      });
  }
}
