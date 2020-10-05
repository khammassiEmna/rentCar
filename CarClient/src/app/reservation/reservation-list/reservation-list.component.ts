import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Observable<reservation[]>
  errorMsg: Boolean;
  constructor(private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit(): void {

  }
  loadData() {
    this.reservations = this.reservationService.getNotConfirmed()

  }
  deleteReservation(id: number) {
    console.log("id", id)
    this.reservationService.delete(id).subscribe(

      error => console.log(error));
    this.loadData();


  }
  confirmReservation(id: number) {
    console.log("id", id)
    this.reservationService.confirmReservation(id).subscribe(
      data => {
        this.errorMsg = !data;
        this.loadData();
      },
      error => console.log(error));

  }

}
