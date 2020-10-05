import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Car } from "../../models/car";
import { reservation } from "../../models/reservation";

import { carService } from "../../services/car-service"
import { ReservationService } from "../../services/reservation.service"

import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from '../../auth/token-storage.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {
  btnReserver: Boolean
  username: string;
  cars: Observable<Car[]>;
  car: Observable<Car>
  try: String;
  cartOpen: Boolean;
  isOpen: Boolean;
  recentCars: Observable<Car[]>
  dateDeb: Date;
  dateFin: Date
  p: number;
  price: number;

  private roles: string[];
  public authority: string;
  reserv: reservation;
  modelName: string;
  currentDate: any;
  error: any = { isError: false, errorMessage: '' };
  errorCurrent: any = { isError: false, errorMessage: '' };
  errorMsg: Boolean
  constructor(private carService: carService,
    private reservationService: ReservationService,
    private router: Router, private sanitizer: DomSanitizer,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername(),
        this.roles.every(role => {
          if (role === 'ROLE_ADMIN') {
            this.authority = 'admin';
            return false;
          } else if (role === 'ROLE_PM') {
            this.authority = 'pm';
            return false;
          }
          this.authority = 'user';
          return true;
        });
    }

    this.try = "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";
    this.reloadData();
    this.getRecent();
  }
  getRecent() {
    this.recentCars = this.carService.getRecent();
    this.recentCars.forEach(car => {

    });

  }
  reloadData() {
    this.cars = this.carService.getCarList();

  }
  compareWithCurrent() {
    this.errorCurrent = { isError: false, errorMessage: '' }
    this.currentDate = new Date();
    this.currentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en_US');
    if (this.currentDate > this.dateDeb) {

      this.errorCurrent = { isError: true, errorMessage: 'Start date must be > than the current date' }
    }
  }
  compareTwoDates() {
    this.error = { isError: false, errorMessage: '' }
    if (this.dateDeb > this.dateFin) {
      this.btnReserver = false;

      this.error = { isError: true, errorMessage: 'La date de fin ne peut pa préceder la date debut' }
    } else {

      var nbrJrs = Math.abs(new Date(this.dateFin).getTime() - new Date(this.dateDeb).getTime()) / (1000 * 3600 * 24)
      this.price = this.p * nbrJrs;
      console.log("prix", this.price)
      this.btnReserver = true
    }
    console.log("Btnreserver=", this.btnReserver)


  }
  priceTri(value: string): void {
    console.log(" ", value);
    this.cars = this.carService.getByPrice(value)
    this.recentCars = this.carService.getNewByPrice(value)
  }
  getById(id: number) {
    this.btnReserver = false;
    console.log("iddd", id)
    this.carService.getById(id).subscribe(
      data => {
        console.log(data);
        this.p = data.price;
        this.car = data;
      },
      error => console.log(error));
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  getCarByModel(): void {
    console.log("le modele", this.modelName);
    this.cars = this.carService.getByModel(this.modelName);
    this.recentCars = this.carService.getRecentByModel(this.modelName);
  }
  carDetails(id: number) {
    this.router.navigate(['details', id]);
  }
  reserver() {

    this.reserv = new reservation;
    this.reserv.dateDeb = this.dateDeb;
    this.reserv.dateFin = this.dateFin;
    this.reserv.car = this.car;
    console.log("reservation", this.reserv.car);
    this.reservationService.addReservation(this.username, this.reserv).subscribe(
      data => {
        console.log(data);
        this.errorMsg = !data
        if (data == true) {
          this.car = null;
        }
        this.reloadData();
      },
      error => console.log(error));
  }



}
