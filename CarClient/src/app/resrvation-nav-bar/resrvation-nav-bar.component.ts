import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resrvation-nav-bar',
  templateUrl: './resrvation-nav-bar.component.html',
  styleUrls: ['./resrvation-nav-bar.component.css']
})
export class ResrvationNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  listNext() {
    this.router.navigate(['/nextReservation']);

  }

  listOld() {

    this.router.navigate(['/oldReservation']);

  }
  listNotConfirmed() {

    this.router.navigate(['/notConfirmed']);

  }
  listReturn() {

    this.router.navigate(['/returns']);

  }
  listReservOfTheDay() {

    this.router.navigate(['/reservOfTheDay']);

  }
}
