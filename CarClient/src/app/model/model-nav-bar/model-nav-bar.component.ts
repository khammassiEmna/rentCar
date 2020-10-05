import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-nav-bar',
  templateUrl: './model-nav-bar.component.html',
  styleUrls: ['./model-nav-bar.component.css']
})
export class ModelNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  add() {
    this.router.navigate(['/addModel']);

  }

  gotoList() {

    this.router.navigate(['/listModel']);

  }

}
