import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css']
})
export class UserReservationComponent implements OnInit {
  reservations: Observable<reservation[]>
  notFound: Boolean;
  userName: string;
  constructor(private reservationService: ReservationService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName = this.tokenStorage.getUsername();
    this.reloadData();

  }
  reloadData(): void {
    this.reservationService.findByUser(this.userName).subscribe(data => {
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
