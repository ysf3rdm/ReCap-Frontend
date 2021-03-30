import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { RentalService } from 'src/app/services/rental.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rental-detail';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  inputs: ['rental.returnDate'],
})
export class CarComponent implements OnInit {
  rentalAddForm: FormGroup;
  customerId: Number;
  customers: Customer[] = [];
  rental: Rental;
  rentDate: Date;
  totalDay: number;
  totalPrice: number;
  returnDate: Date;
  currentCar: CarDetail;
  carDetails: CarDetail[] = [];
  images: Image[] = [];
  dataLoaded = false;
  rentalDetail: Rental;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private imageService: ImageService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsByCarId(params['carId']);
      this.getImagesByCarId(params['carId']);
    });
    this.getCustomers();
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
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
    this.totalPrice = this.totalDay * this.carDetails[0].dailyPrice;
    return this.totalPrice, this.totalDay;
  }
  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }
  rent() {
    if (this.rentDate && this.returnDate && this.returnDate > this.rentDate) {
      this.rentalDetail = {
        rentDate: this.rentalAddForm.value.rentDate,
        returnDate: this.rentalAddForm.value.returnDate,
        customerId: Number(this.customerId),
        carId: 1,
        totalPrice: this.totalPrice,
      };
      console.log(this.rentDate);
      this.toastrService.success('Ödeme Sayfasına Yönlendirliyorsununuz');
      return true;
    } else {
      this.toastrService.error('Tarih Hatalı');

      return false;
    }
  }
}
