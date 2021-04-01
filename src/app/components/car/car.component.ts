import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { RentalService } from 'src/app/services/rental.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
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
      this.currentCar = response.data[0];
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

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }
}
