import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44368/api/";
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
} 
