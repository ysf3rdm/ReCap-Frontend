import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { CreditCardModel } from 'src/app/models/creditCardModel';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { UserModel } from 'src/app/models/userModel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  cards: CreditCardModel[] = [];
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
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
    this.getNamesAndEmail();
    this.createUserUpdateForm();
    this.setValues();
  }
  getNamesAndEmail() {
    this.firstName = this.localStorageService.getFirstName();
    this.lastName = this.localStorageService.getLastName();
    this.email = this.localStorageService.getEmail();
  }
  setValues() {
    this.userUpdateForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
  getCustomer() {
    this.customerService
      .getCustomerByUserId(parseInt(localStorage.getItem('userId')))
      .subscribe((response) => {
        this.customer = response.data[0];
        this.getCards();
      });
  }
  update() {
    if (this.userUpdateForm.valid) {
      if (
        this.userUpdateForm.value.password ===
        this.userUpdateForm.value.passwordConfirm
      ) {
        let userModel = {
          userId: parseInt(localStorage.getItem('userId')),
          firstName: this.userUpdateForm.value.firstName,
          lastName: this.userUpdateForm.value.lastName,
          email: this.email,
          password: this.userUpdateForm.value.password,
        };
        this.userService.update(userModel).subscribe((response) => {
          this.toastrService.success('Başarıyla Güncellendi', 'Başarılı');
          this.toastrService.info(
            'Giriş sayfasına yönlendiriliyorsunuz',
            'Bilgi'
          );
          this.localStorageService.logOut();
          this.router.navigate(['login']);
        });
      } else {
        this.toastrService.error('Şifreler uyuşmuyor', 'Hata');
      }
    } else {
      this.toastrService.error('Formunuz eksik veya hatalı', 'Hata');
    }
  }
  routeToCustomerAdd() {
    this.router.navigate(['customeradd']);
  }
  getCards() {
    this.paymentService
      .getCardByCustomer(this.customer.customerId)
      .subscribe((response) => {
        this.cards = response.data;
      });
  }
}
