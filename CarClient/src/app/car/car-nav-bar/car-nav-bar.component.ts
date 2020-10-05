import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-nav-bar',
  templateUrl: './car-nav-bar.component.html',
  styleUrls: ['./car-nav-bar.component.css']
})
export class CarNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  add() {
    this.router.navigate(['/addCar']);

  }

  gotoList() {

    this.router.navigate(['/adminListCar']);

  }
}
