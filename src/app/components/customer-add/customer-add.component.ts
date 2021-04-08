import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  user: UserModel;
  customerAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCustomerAddForm();
    this.getUser();
  }
  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  }
  addCustomer() {
    if (this.customerAddForm.value === undefined) {
      this.customerAddForm.value.companyName = '';
      console.log('olmadı cürüm');
    } else {
      let customerModel = {
        customerId: 0,
        userId: this.user.userId,
        findexPoint: 100,
        companyName: this.customerAddForm.value.companyName,
      };
      console.log(customerModel);
      this.router.navigate(['login']);
      this.customerService.add(customerModel).subscribe((response) => {
        this.toastrService.info(
          'Giriş sayfasına yönelendirliyorsunuz',
          'başarılı'
        );
      });
    }
  }
  getUser() {
    let email = localStorage.getItem('email');
    this.userService.getUser(email).subscribe((response) => {
      this.user = response.data;
    });
  }
}
