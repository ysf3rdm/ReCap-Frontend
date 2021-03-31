import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rentalAddForm = new FormGroup({
    rentDate: new FormControl(''),
    returnDate: new FormControl(''),
  });
  customers: Customer[];
  rentDate: Date;
  returnDate: Date;
  currentCar: CarDetail;
  dataLoaded = false;
  totalDay: number;
  totalPrice: number;
  rental: Rental;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
      }
    });
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.currentCar = response.data[0];
      this.dataLoaded = true;
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  calculateAmount(rentDate: Date, returnDate: Date): Number {
    this.totalDay = Math.floor(
      (returnDate.getTime() - rentDate.getTime()) / 1000 / 60 / 60 / 24
    );
    this.totalPrice = this.totalDay * this.currentCar.dailyPrice;
    return this.totalPrice, this.totalDay;
  }
  pay() {
    let rental: Rental = {
      carId: this.currentCar.dailyPrice,
      customerId: this.customers[0].customerId,
      rentDate: this.rentalAddForm.value.rentDate,
      returnDate: this.rentalAddForm.value.returnDate,
      totalPrice: this.totalPrice,
    };
    this.rentalService.addToRent(rental);
  }
}
