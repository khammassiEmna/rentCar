import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrls: ['./client-nav-bar.component.css']
})
export class ClientNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  add() {
    this.router.navigate(['/addClient']);

  }

  gotoList() {

    this.router.navigate(['/clientList']);

  }
}
