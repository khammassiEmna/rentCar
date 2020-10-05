import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { reservation } from 'src/app/models/reservation';
import { carService } from 'src/app/services/car-service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reser-details',
  templateUrl: './reser-details.component.html',
  styleUrls: ['./reser-details.component.css']
})
export class ReserDetailsComponent implements OnInit {
  reserv: reservation
  id: number;
  cars: Observable<Car[]>;
  selectedCar: Observable<Car>;
  dateDeb: Date;
  dateFin: Date;
  currentDate: any
  errorMsg: Boolean;
  error: any = { isError: false, errorMessage: '' };
  errorCurrent: any = { isError: false, errorMessage: '' };

  constructor(private route: ActivatedRoute, private router: Router,
    private reservService: ReservationService, private carService: carService) { }

  ngOnInit(): void {
    this.reserv = new reservation();
    this.cars = this.carService.getCarList();
    this.id = this.route.snapshot.params['id'];

    this.reservService.getOne(this.id)
      .subscribe(data => {
        console.log(data)
        this.reserv = data;
      }, error => console.log(error));
  }
  onSubmit(): void {
    console.log("La date deb ", this.reserv.dateDeb);
    console.log("matricule", this.selectedCar);
    this.reserv.car = this.selectedCar;
    this.reservService.update(this.id, this.reserv).subscribe(data => {
      console.log("dataaa", data);
      if (data == true) {
        this.router.navigate(['nextReservation']);

      } else
        this.errorMsg = !data;

      error => console.log(error);
    })



  }
  compareWithCurrent() {
    this.currentDate = new Date();
    this.currentDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en_US');
    if (this.currentDate > this.reserv.dateDeb) {
      this.errorCurrent = { isError: true, errorMessage: 'Start date must be > than the current date' }
    }
  }
  compareTwoDates() {
    if (this.reserv.dateDeb > this.reserv.dateFin) {
      this.error = { isError: true, errorMessage: 'End Date can t before start date' }
    }

  }
}
