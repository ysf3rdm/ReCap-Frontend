import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = 'https://localhost:44368/api/';
  constructor(private httpClient: HttpClient) {}
  getImages(): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'images/getall';
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
  getImagesByCarId(carId: number): Observable<ListResponseModel<Image>> {
    let newPath = this.apiUrl + 'images/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Image>>(newPath);
  }
}
