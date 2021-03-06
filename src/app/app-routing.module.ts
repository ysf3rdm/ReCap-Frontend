import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentSummaryComponent } from './components/rent-summary/rent-summary.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarDetailComponent },
  { path: 'cars/color/:colorId', component: CarDetailComponent },
  { path: 'cars/customer/:customerId', component: CarComponent },
  { path: 'cars/rental/:customerId', component: RentalComponent },
  { path: 'cars/rentals', component: RentalComponent },
  { path: 'cars/cardetail/:carId', component: CarComponent },
  { path: 'cars/cardetail/:brandId', component: CarDetailComponent },
  { path: 'cars/cardetail/:colorId', component: CarDetailComponent },
  { path: 'cars/filter/:colorId/:brandId', component: CarDetailComponent },
  { path: 'cars/filter/:brandId', component: CarDetailComponent },
  { path: 'cars/filter/:colorId', component: CarDetailComponent },
  { path: 'cars/rentdetail/:carId', component: RentSummaryComponent },
  { path: 'cars/payment/:carId', component: PaymentComponent },
  {
    path: 'cars/brandAdd',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/colorAdd',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/carAdd',
    component: CarAddComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/colors', component: ColorListComponent },
  {
    path: 'colors/update/:colorId',
    component: ColorUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/brands', component: BrandListComponent },
  {
    path: 'brands/update/:brandId',
    component: BrandUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/cardetail/:carId/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/cardetail/:carId/cars/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cardetail/:carId',
    component: CarComponent,
  },
  {
    path: 'cardetail/:carId/update/:carId ',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cardetail/:carId/cars/update/:carId ',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'customeradd', component: CustomerAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
