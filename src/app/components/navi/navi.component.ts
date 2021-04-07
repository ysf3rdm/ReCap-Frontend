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
}
