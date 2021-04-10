import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[] = [];
  brands: Brand[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getColors();
    this.getBrands();
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
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
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModel = {
        carId: 0,
        brandId: +this.carAddForm.value.brandId,
        colorId: +this.carAddForm.value.colorId,
        description: this.carAddForm.value.description,
        carName: this.carAddForm.value.carName,
        modelYear: this.carAddForm.value.modelYear,
        dailyPrice: this.carAddForm.value.dailyPrice,
        findexPoint: this.carAddForm.value.findexPoint,
        giveToPoint: this.carAddForm.value.giveToPoint,
      };
      console.log(carModel);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz hatalı kontrol ediniz', 'Hata');
    }
  }
}
