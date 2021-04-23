import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  interval: any;
  nowDate = Date.now();
  expiration: Date = new Date(this.localStorage.getExpiration());
  expirationTime: number;
  expirationMinutes: any;
  expirationSeconds: any;
  firstName = '';
  lastName = '';
  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  user: RegisterModel;
  ngOnInit(): void {
    this.getFirstName();
    this.interval = setInterval(() => {
      this.getExpirataion();
    }, 1000);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }
  getFirstName() {
    this.firstName = this.localStorage.getFirstName();
    if (this.firstName === null) {
      return false;
    } else {
      return true;
    }
  }
  logOut() {
    this.localStorage.logOut();
    this.toastrService.warning('Çıkış Yapıldı', 'Uyarı');
    this.router.navigate(['login']);
  }
  isAdmin() {
    if (localStorage.getItem('claim') === 'admin') {
      return true;
    } else {
      return false;
    }
  }
  getExpirataion() {
    let timeNow = Date.now();
    let expiration = this.expiration.getTime();
    this.expirationTime = expiration - timeNow;
    this.expirationMinutes = this.expirationTime / 1000 / 60;
    this.expirationMinutes = parseInt(this.expirationMinutes);
    this.expirationSeconds = (this.expirationTime / 1000) % 60;
    this.expirationSeconds = parseInt(this.expirationSeconds);
    if (expiration <= timeNow) {
      this.toastrService.info(
        'Süreniz bitmiştir.Tekrar giriş yapınız',
        'Bilgi'
      );
      this.router.navigate(['login']);
      this.localStorage.logOut();
      clearInterval(this.interval);
    }
  }
}
