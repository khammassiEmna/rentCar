import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../services/brand-service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  id: number;
  brand: Brand;

  constructor(private route: ActivatedRoute, private router: Router,
    private brandService: BrandService) { }

  ngOnInit() {
    this.brand = new Brand();

    this.id = this.route.snapshot.params['id'];

    this.brandService.getBrand(this.id)
      .subscribe(data => {
        console.log(data)
        this.brand = data;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['brands']);
  }
}
