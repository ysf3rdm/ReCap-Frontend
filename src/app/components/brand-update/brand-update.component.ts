import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand: Brand;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrandById(params['brandId']);
    });
    this.createBrandUpdateForm();
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  getBrandById(brandId: number) {
    this.brandService.getBrandByBrandId(brandId).subscribe((response) => {
      this.brand = response.data[0];
    });
  }
  updateBrand() {
    let newBrand = Object.assign({}, this.brandUpdateForm.value);
    newBrand.brandId = this.brand.brandId;
    this.brandService.updateBrand(newBrand).subscribe((response) => {
      this.toastrService.success('Başarıyla Güncellendi', 'Başarılı');
    });
  }
}
