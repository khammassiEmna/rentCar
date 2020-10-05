import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../../services/brand-service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

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
        console.log(this.brand)

      }, error => console.log(error));
  }

  updateBrand() {
    this.brandService.updateBrand(this.id, this.brand)
      .subscribe(data => {
        console.log(data);
        this.brand = new Brand();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateBrand();
  }

  gotoList() {
    this.router.navigate(['/listBrand']);
  }
}
