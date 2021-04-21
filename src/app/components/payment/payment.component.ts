import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardModel } from 'src/app/models/creditCardModel';
import { Customer } from 'src/app/models/customer';
import { Image } from 'src/app/models/image';
import { PaymentDetail } from 'src/app/models/paymentDetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ImageService } from 'src/app/services/image.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  path = 'https://localhost:44368/';

  creditCardForm: FormGroup;
  totalPoint: number;
  customer: Customer;
  rentDate: Date;
  returnDate: Date;
  currentCar: CarDetail;
  dataLoaded = false;
  totalDay: number;
  totalPrice: number;
  rental: Rental;
  firstName: string;
  lastName: string;
  customerSelected: number;
  expirationMonth: number;
  expirationYear: number;
  ccv: string;
  cardNumber: string;
  holderName: string;
  paymentDetail: PaymentDetail;
  creditCard: CreditCard;
  baba = false;
  cards: CreditCardModel[] = [];
  images: Image[] = [];
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private imageService: ImageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createCreditCardForm();
    this.getCustomerByUserId();
    this.getFirstAndLastName();

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.getImagesByCarId(params['carId']);
      }
    });
  }
  getCards() {
    this.paymentService
      .getCardByCustomer(this.customer?.customerId)
      .subscribe((response) => {
        this.cards = response.data;
      });
  }
  getFirstAndLastName() {
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
  }
  setCurrentCard(card: CreditCard) {
    this.creditCardForm.patchValue({
      holderName: card.holderName,
      cardNumber: card.cardNumber,
      expirationMonth: card.expirationMonth,
      expirationYear: card.expirationYear,
      ccv: card.cvv,
      wannaSave: false,
    });
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      holderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationYear: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      ccv: ['', Validators.required],
      wannaSave: [''],
    });
  }
  getSlideClass(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  getImagesByCarId(carId: number) {
    this.imageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.currentCar = response.data[0];
      this.dataLoaded = true;
      this.calculateAmount();
    });
  }
  getCustomerByUserId() {
    this.customerService
      .getCustomerByUserId(parseInt(localStorage.getItem('userId')))
      .subscribe((response) => {
        this.customer = response.data[0];
        this.getCards();
      });
  }
  addPoint() {
    this.totalPoint = this.totalDay * this.currentCar.giveToPoint;
  }
  calculateAmount() {
    let rentDate = new Date(this.localStorageService.getRentDate());
    let returnDate = new Date(this.localStorageService.getReturnDate());
    this.toastrService.success('Tarihler Seçildi', 'Başarılı');
    this.totalDay = Math.floor(
      (returnDate.getTime() - rentDate.getTime()) / 1000 / 60 / 60 / 24
    );
    this.totalPrice = this.totalDay * this.currentCar.dailyPrice;
    this.addPoint();
  }
  pay() {
    let rental: Rental = {
      carId: this.currentCar.carId,
      customerId: this.customer.customerId,
      rentDate: new Date(this.localStorageService.getRentDate()),
      returnDate: new Date(this.localStorageService.getReturnDate()),
      totalPrice: this.totalPrice,
    };
    let creditCard: CreditCard = {
      id: 0,
      cardNumber: this.creditCardForm.value.cardNumber.toString(),
      holderName: this.creditCardForm.value.holderName,
      cvv: this.creditCardForm.value.ccv.toString(),
      expirationYear: parseInt(this.creditCardForm.value.expirationYear),
      expirationMonth: parseInt(this.creditCardForm.value.expirationMonth),
    };
    let paymentDetail = {
      creditCard: creditCard,
      rental: rental,
    };
    this.rentalService.addToRent(paymentDetail).subscribe(
      (response) => {
        if (this.creditCardForm.value.wannaSave) {
          let savedCard: CreditCardModel = {
            id: 0,
            cardNumber: creditCard.cardNumber,
            holderName: creditCard.holderName,
            cvv: creditCard.cvv,
            expirationMonth: creditCard.expirationMonth,
            expirationYear: creditCard.expirationYear,
            customerId: this.customer.customerId,
          };
          this.paymentService.saveCard(savedCard).subscribe(
            (response) => {
              this.toastrService.success(
                'Kartınız başarıyla kaydedildi',
                'Başarılı'
              );
            },
            (errorResponse) => {
              this.toastrService.info(
                'Kart zaten kayıtlı olduğu için kaydedilmedi',
                'Hata'
              );
            }
          );
        }
        this.customer.findexPoint += this.totalPoint;
        this.customerService.update(this.customer).subscribe();
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(['/']).then(() =>
          setTimeout(function () {
            window.location.reload();
          }, 1000)
        );
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'HATA');
      }
    );
  }
  getImagePath(image: string) {
    if (image) {
      let newPath = this.path + image;
      return newPath;
    } else {
      let defaultPath = this.path + '\\Images\\default.jpg';
      return defaultPath;
    }
  }
}
