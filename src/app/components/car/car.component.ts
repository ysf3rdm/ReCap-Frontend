import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { RentalService } from 'src/app/services/rental.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  inputs: ['rental.returnDate'],
})
export class CarComponent implements OnInit {
  rentalAddForm: FormGroup;
  customerId: Number;
  customer: Customer;
  rental: Rental;
  rentDate: Date;
  totalDay: number;
  totalPrice: number;
  returnDate: Date;
  carDetails: CarDetail;
  currentCar: Car;
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
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsByCarId(params['carId']);
      this.getImagesByCarId(params['carId']);
    });
    this.getCustomerByUserId();
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data[0];
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomerByUserId() {
    this.customerService
      .getCustomerByUserId(parseInt(localStorage.getItem('userId')))
      .subscribe((response) => {
        this.customer = response.data[0];
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
  isAdmin() {
    if (localStorage.getItem('claim') === 'admin') {
      return true;
    } else {
      return false;
    }
  }
  isCustomer() {
    if (this.customer === undefined) {
      return true;
    }
    return false;
  }
  isFindexEnough() {
    if (this.customer?.findexPoint >= this.carDetails?.findexPoint) {
      return true;
    } else {
      return false;
    }
  }
  deleteCar() {
    this.carService
      .getCarByCarId(this.carDetails.carId)
      .subscribe((response) => {
        let deletedCar = response.data[0];
        this.carService.delete(deletedCar).subscribe(
          (response1) => {
            this.toastrService.success(response1.message, 'Başarılı');
            this.router.navigate(['/']).then(() =>
              setTimeout(function () {
                window.location.reload();
              }, 1000)
            );
          },
          (errorResponse) => {
            this.toastrService.error('Başarısız');
          }
        );
      });
  }
}
