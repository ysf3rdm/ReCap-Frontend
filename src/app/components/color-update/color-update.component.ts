import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColorById(params['colorId']);
    });
    this.createColorUpdateForm();
    this.setValue();
  }
  async createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
    return true;
  }

  async getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      return response.data[0];
    });
  }
  updateColor() {
    let newColor = Object.assign({}, this.colorUpdateForm.value);
    console.log(this.colorUpdateForm);
    newColor.colorId = this.color.colorId;
    this.colorService.updateColor(newColor).subscribe((response) => {
      this.toastrService.success('Başarıyla Güncellendi', 'Başarılı');
    });
  }
  async setValue() {
    await Promise.resolve(this.color);
    this.colorUpdateForm.setValue({
      colorName: this.color.colorName,
    });
  }
}
