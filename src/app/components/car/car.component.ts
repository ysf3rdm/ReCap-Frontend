import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
      } else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByBrandId(brandId: number) {
    this.carDetailService
      .getCarDetailsByBrandId(brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }
  getCarDetailsByCarId(carId: number) {
    this.carDetailService
      .getCarDetailsByBrandId(carId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }
}
