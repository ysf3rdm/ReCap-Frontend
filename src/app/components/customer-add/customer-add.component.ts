import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  firstName = '';
  customerAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {}
  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }
  getName() {
    this.firstName = this.localStorage.getFirstName();
  }
}
