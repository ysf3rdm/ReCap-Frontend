import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car-detail';
import { Color } from 'src/app/models/color';
import { Image } from 'src/app/models/image';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  colors: Color[];
  brands: Brand[];
  carDetail: CarDetail;
  dataLoaded = false;
  images: Image[];
  carUpdateForm: FormGroup;
  constructor(
    private carService: CarService,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createCarUpdateForm();
    this.getBrands();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsByCarId(params['carId']);
      this.getImagesByCarId(params['carId']);
    });
    this.setCarDetail();
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carName: ['', Validators.required],
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findexPoint: ['', Validators.required],
      giveToPoint: ['', Validators.required],
    });
  }
  updateCar() {
    let newCar = Object.assign({}, this.carUpdateForm.value);
    newCar.carId = this.carDetail.carId;
    if (this.carUpdateForm.value.brandId === '') {
      newCar.brandId = this.carDetail.brandId;
    } else {
      newCar.brandId = +this.carUpdateForm.value.brandId;
    }
    if (this.carUpdateForm.value.colorId === '') {
      newCar.colorId = this.carDetail.colorId;
    } else {
      newCar.colorId = +this.carUpdateForm.value.colorId;
    }

    console.log(this.carUpdateForm);
    console.log(newCar);
    this.carService.update(newCar).subscribe((response) => {
      console.log(response);
      this.toastrService.success('Başarıyla Güncellendi', 'Başarılı');
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setSelectedColor(colorId: number) {
    if (colorId == this.carDetail?.colorId) {
      return true;
    } else {
      return false;
    }
  }
  setSelectedBrand(brandId: number) {
    if (brandId == this.carDetail?.brandId) {
      return true;
    } else {
      return false;
    }
  }
  setCarDetail() {
    this.carUpdateForm.patchValue({
      carName: this.carDetail?.carName,
      modelYear: this.carDetail?.modelYear,
      dailyPrice: this.carDetail?.dailyPrice,
      description: this.carDetail?.description,
      findexPoint: this.carDetail?.findexPoint,
      giveToPoint: this.carDetail?.giveToPoint,
    });
  }
}
