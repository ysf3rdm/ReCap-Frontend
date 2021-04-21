import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dateForm: FormGroup;
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDay = new Date().getDate();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  minDateforReturn = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay + 1
  );
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createDateForm();
  }

  createDateForm() {
    this.dateForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  checkDates() {
    if (this.dateForm.valid) {
      this.localStorageService.setRentDate(this.dateForm.value.rentDate);
      this.localStorageService.setReturnDate(this.dateForm.value.returnDate);
      if (this.dateForm.value.rentDate >= this.dateForm.value.returnDate) {
        this.toastrService.error(
          'Teslim tarihi iade tarihinden önce veya aynı olamaz',
          'Tarih Hatası'
        );
      } else {
        this.toastrService.success('Tarihler Seçildi', 'Başarılı');
        this.router.navigate(['/cars']);
      }
    } else {
      this.toastrService.error('Formunuz Hatalı!', 'Hata');
    }
  }
}
