import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand-service';
import { Router } from '@angular/router';
import { Observable, from } from "rxjs";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  private roles: string[];
  exist: Boolean;
  brand: Brand = new Brand();
  submitted = false;
  add: boolean;
  list: boolean;
  update: boolean;
  brands: Observable<Brand[]>;
  id: number
  public authority: string;

  constructor(private brandService: BrandService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.add = false;
    this.list = false;
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role != 'ROLE_ADMIN') {
          this.router.navigate(['listCar']);


        }
      });
    } else {
      this.router.navigate(['auth/login']);

    }

  }
  getBrand(id: number) {
    this.brand = new Brand();
    this.id = id;
    this.brandService.getBrand(id)
      .subscribe(data => {
        console.log(data)
        this.brand = data;
      }
        , error => console.log(error));
    this.add = false;
    this.update = true;
  }

  updateBrand() {
    this.brandService.updateBrand(this.id, this.brand)
      .subscribe(data => {
        console.log(data);
        this.brand = new Brand();
        this.gotoList();
      }, error => console.log(error));
    this.update = false;
  }

  newEmployee(): void {
    this.submitted = false;
    this.brand = new Brand();
  }
  findByName() {
    this.brandService.findByName(this.brand.name).subscribe(data => {
      if (data) {
        this.exist = true
      } else {
        this.save()
      }
    })
  }
  save() {
    this.submitted = true;

    this.brandService
      .createBrand(this.brand).subscribe(data => {
        console.log(data)
        this.brand = new Brand();
        this.router.navigate(['listBrand']);
      },
        error => console.log(error));
  }

  onSubmit() {
    this.findByName();
  }

  gotoList() {

  }
  reloadData() {
    this.brands = this.brandService.getBrandList();
  }
  deleteBrand(id: number) {
    this.brandService.deleteBrand(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  brandDetails(id: number) {
    this.router.navigate(['details', id]);
  }

}
