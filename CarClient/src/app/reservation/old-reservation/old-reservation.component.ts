import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-old-reservation',
  templateUrl: './old-reservation.component.html',
  styleUrls: ['./old-reservation.component.css']
})
export class OldReservationComponent implements OnInit {

  reservations: Observable<reservation[]>
  notFound: Boolean;
  constructor(private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit(): void {

    this.reloadData();

  }
  reloadData(): void {
    this.reservationService.findOld().subscribe(data => {
      if (data == null) {
        this.notFound = true;
      }
      else
        this.reservations = data;
    });
  }
  delete(id: number): void {
    this.reservationService.delete(id).subscribe(data => {
      if (data == true)
        this.reloadData();
    })



  }
}
