import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/car-detail';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandId(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbyid?Id=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbycolorid?Id=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl + 'cars/getcardetailsbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByCarId(
    carId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByColorId(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl + 'cars/getcardetailsbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarDetailsByColorIdandBrandId(
    colorId: number,
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath =
      this.apiUrl +
      'cars/getcardetailsbybrandidandcolorid?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
