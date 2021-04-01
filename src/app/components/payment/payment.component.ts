import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { PaymentDetail } from 'src/app/models/paymentDetail';
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
    holderName: new FormControl(''),
    cardNumber: new FormControl(''),
  });
  customers: Customer[];
  rentDate: Date;
  returnDate: Date;
  currentCar: CarDetail;
  dataLoaded = false;
  totalDay: number;
  totalPrice: number;
  rental: Rental;
  customerSelected: number;
  expirationMonth: number;
  expirationYear: number;
  ccv: string;
  cardNumber: string;
  holderName: string;
  paymentDetail: PaymentDetail;
  creditCard: CreditCard;
  baba = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private router: Router,
    private toastrService: ToastrService
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
  calculateAmount(rentDate: Date, returnDate: Date) {
    this.totalDay = Math.floor(
      (returnDate.getTime() - rentDate.getTime()) / 1000 / 60 / 60 / 24
    );
    this.totalPrice = this.totalDay * this.currentCar.dailyPrice;
    this.baba = true;
  }
  pay() {
    let rental: Rental = {
      carId: this.currentCar.carId,
      customerId: +this.customerSelected,
      rentDate: this.rentalAddForm.value.rentDate,
      returnDate: this.rentalAddForm.value.returnDate,
      totalPrice: this.totalPrice,
    };
    let creditCard: CreditCard = {
      cardNumber: this.rentalAddForm.value.cardNumber,
      holderName: this.rentalAddForm.value.holderName,
      cvv: this.ccv,
      expirationYear: +this.expirationYear,
      expirationMonth: +this.expirationMonth,
    };
    let paymentDetail = {
      creditCard: creditCard,
      rental: rental,
    };
    console.log(paymentDetail);
    this.rentalService.addToRent(paymentDetail).subscribe((response) => {
      console.log(response);
      this.toastrService.success(
        'Ana sayfaya yönlendiriliyorsunuz',
        'ödeme tamamlandı'
      );
      this.router.navigate(['/']).then(() =>
        setTimeout(function () {
          window.location.reload();
        }, 800)
      );
    });
  }
}
