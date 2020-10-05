import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';
import { Car } from 'src/app/models/car';
import { carService } from 'src/app/services/car-service';
import { reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationAddComponent implements OnInit {
  currentDate: any;
  error: any = { isError: false, errorMessage: '' };
  errorCurrent: any = { isError: false, errorMessage: '' };
  id: number;
  users: Observable<User[]>
  dateDeb: Date;
  dateFin: Date;
  username: string
  car: Observable<Car>
  reserv: reservation;
  errorMsg: Boolean
  p: number;
  price: number;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
    private carService: carService, private reservationService: ReservationService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.carService.getById(this.id).subscribe(
      data => {
        console.log(data);

        this.car = data;
        this.p = data.price;
        console.log("price ", this.p)
      },
      error => console.log(error));
    this.users = this.authService.getAll()
  }

  compareWithCurrent() {
    this.errorCurrent = { isError: false, errorMessage: ' ' }
    this.currentDate = new Date();
    this.currentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en_US');
    if (this.currentDate > this.dateDeb) {
      this.errorCurrent = { isError: true, errorMessage: 'La date de début doit être supérieure à celle d aujourd`hui' }
    }
  }
  compareTwoDates() {
    this.error = { isError: false, errorMessage: ' ' }

    if (this.dateDeb > this.dateFin) {
      this.error = { isError: true, errorMessage: 'La date de fin doit être supérieur à la date de début' }
    } else {
      var nbrJrs = Math.abs(new Date(this.dateFin).getTime() - new Date(this.dateDeb).getTime()) / (1000 * 3600 * 24)
      this.price = this.p * nbrJrs;
      console.log("prix", this.price)
    }
  }

  reserver() {

    this.reserv = new reservation;
    this.reserv.dateDeb = this.dateDeb;
    this.reserv.dateFin = this.dateFin;
    this.reserv.car = this.car;
    this.reserv.confirmed = true;
    console.log("reservation", this.reserv.car);
    this.reservationService.addReservation(this.username, this.reserv).subscribe(
      data => {
        this.errorMsg = !data;
        if (this.errorMsg == false) {
          this.router.navigate(['adminListCar']);

        }
        console.log("error", this.errorMsg)
      },
      error => console.log(error));
  }

}
