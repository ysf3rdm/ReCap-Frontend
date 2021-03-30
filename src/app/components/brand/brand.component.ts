import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car-detail';
import { Color } from 'src/app/models/color';
import { Customer } from 'src/app/models/customer';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  customers: Customer[] = [];
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  brandNumber: number;
  colorNumber: number;
  currentBrand: Brand;
  currentColor: Color;
  currentCustomer: Customer;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getBrands();
    this.getColors();
    this.getCustomerDetail();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandsClass() {
    if (!this.currentBrand) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllColorsClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  getCustomerDetail() {
    this.customerService.getCustomerDetail().subscribe((response) => {
      this.customers = response.data;
    });
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
  }
  getCurrentCustomerClass(customer: Customer) {
    if (customer == this.currentCustomer) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getCarDetailsByBrandId(brandId: number) {
    this.carService.getCarDetailsByBrandId(brandId).subscribe((response) => {
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
  getSelectedBrand(brandId: number) {
    if (this.brandNumber == brandId) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedColor(colorId: number) {
    if (this.colorNumber == colorId) {
      return true;
    } else {
      return false;
    }
  }
}
