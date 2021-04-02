import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentSummaryComponent } from './components/rent-summary/rent-summary.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarDetailComponent },
  { path: 'cars', component: CarDetailComponent },
  { path: 'cars/brand/:brandId', component: CarDetailComponent },
  { path: 'cars/color/:colorId', component: CarDetailComponent },
  { path: 'cars/customer/:customerId', component: CarComponent },
  { path: 'cars/rental/:customerId', component: RentalComponent },
  { path: 'cars/cardetail/:carId', component: CarComponent },
  { path: 'cars/cardetail/:brandId', component: CarDetailComponent },
  { path: 'cars/cardetail/:colorId', component: CarDetailComponent },
  { path: 'cars/filter/:colorId/:brandId', component: CarDetailComponent },
  { path: 'cars/filter/:brandId', component: CarDetailComponent },
  { path: 'cars/filter/:colorId', component: CarDetailComponent },
  { path: 'cars/rentdetail/:carId', component: RentSummaryComponent },
  { path: 'cars/payment/:carId', component: PaymentComponent },
  { path: 'cars/brandAdd', component: BrandAddComponent },
  { path: 'cars/colorAdd', component: ColorAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
