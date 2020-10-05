import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-return-of-the-day',
  templateUrl: './return-of-the-day.component.html',
  styleUrls: ['./return-of-the-day.component.css']
})
export class ReturnOfTheDayComponent implements OnInit {

  reservations: Observable<ReservationService[]>
  notFound: Boolean;
  constructor(private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit(): void {

    this.reloadData();

  }
  reloadData(): void {
    this.reservationService.returnOfTheDay().subscribe(data => {
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
