import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-next-reservation',
  templateUrl: './next-reservation.component.html',
  styleUrls: ['./next-reservation.component.css']
})
export class NextReservationComponent implements OnInit {
  reservations: Observable<reservation[]>
  notFound: Boolean;
  constructor(private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();


  }
  reloadData(): void {
    this.reservationService.findNext().subscribe(data => {
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
  update(id: number): void {
    this.router.navigate(['reservDetails', id]);

  }

}
