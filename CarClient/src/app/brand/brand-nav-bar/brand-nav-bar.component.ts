import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-nav-bar',
  templateUrl: './brand-nav-bar.component.html',
  styleUrls: ['./brand-nav-bar.component.css']
})
export class BrandNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  addB() {
    this.router.navigate(['/addBrand']);

  }

  gotoListB() {

    this.router.navigate(['/listBrand']);

  }

}
