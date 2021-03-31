import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-rent-summary',
  templateUrl: './rent-summary.component.html',
  styleUrls: ['./rent-summary.component.css'],
})
export class RentSummaryComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private modalService: NgModule
  ) {}
  totalDay: number;
  rentDate: Date;
  returnDate: Date;
  totalPrice: number;
  rentalAddForm: FormGroup;
  carId: number;
  currentCar: CarDetail;
  dataLoaded = false;
  ngOnInit(): void {
    this.createRentalAddForm();
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

  getDates() {
    this.rentDate = this.rentalAddForm.value.rentDate;
    this.returnDate = this.rentalAddForm.value.returnDate;
    console.log(this.rentDate);
  }
  createRentalAddForm() {
    this.rentalAddForm = this.fb.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }
}
