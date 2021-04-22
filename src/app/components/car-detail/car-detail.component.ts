import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { Image } from 'src/app/models/image';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  rentDate = localStorage.getItem('rentDate');
  path = 'https://localhost:44368/';
  nowDate = Date.now();
  expirationTime = Date.parse(localStorage.getItem('expiration'));
  carDetails: CarDetail[];
  images: Image[];
  filterText = '';

  dataLoaded = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private imageService: ImageService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expirationLogOut();
    localStorage.setItem('claim', '');
    this.getClaims();
    this.getImages();
    this.getCarDetailsByRentDate();
  }
  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  getImages() {
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
  }
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByRentDate() {
    this.carService
      .getCarDetailsByRentDate(this.rentDate)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
        this.isAvalabile();
      });
  }
  getCarDetailsByBrandId(brandId: number) {
    this.carService.getCarDetailsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByColorId(colorId: number) {
    this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarDetailsByColorIdandBrandId(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
  }
  getImagePath(image: string) {
    if (image) {
      let newPath = this.path + image;
      return newPath;
    } else {
      let defaultPath = this.path + '\\Images\\default.jpg';
      return defaultPath;
    }
  }
  getClaims() {
    let newUser = {
      userId: parseInt(localStorage.getItem('userId')),
    };
    this.userService.getClaims(newUser.userId).subscribe((response) => {
      this.localStorageService.setClaims(response.data);
    });
  }
  isAdmin() {
    if (localStorage.getItem('claim') === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  expirationLogOut() {
    if (this.expirationTime <= this.nowDate) {
      this.toastrService.info(
        'Süreniz bitmiştir.Tekrar giriş yapınız',
        'Bilgi'
      );
      this.router.navigate(['login']);
      this.localStorageService.logOut();
    }
  }
  isAvalabile() {
    for (let i = 0; i < this.carDetails.length; i++) {
      if (!this.carDetails[i].isRentable) {
        this.carDetails.splice(i, 1);
        if (i <= 0) {
          i = -1;
        } else {
          i -= 1;
        }
      }
    }
  }
}
