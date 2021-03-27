import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/car-detail';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentItem } from '../models/rentItem';
import { RentItems } from '../models/rentItems';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}
  getRental(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getCustomerRental(customerId: number): Observable<ListResponseModel<Rental>> {
    let newPath =
      this.apiUrl + 'rentals/getbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addToRent(car: CarDetail) {
    let item = RentItems.find((p) => p.car.carId === car.carId);
    let rentItem = new RentItem();
    rentItem.car = car;
    RentItems.push(rentItem);
  }
}