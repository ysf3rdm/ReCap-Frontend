import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rental-detail';

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
    private fb: FormBuilder
  ) {}
  returnDate: Date;
  totalPrice: number;
  rentalAddForm: FormGroup;
  carId: number;
  @Input() rental: Rental;
  rentalDetails: Rental;
  currentCar: CarDetail;
  dataLoaded = false;
  ngOnInit(): void {
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
  getRentalDetails() {
    this.rentalDetails = this.rental;
  }
}
