import { Component, OnInit } from '@angular/core';
import { Observable, from } from "rxjs";
import { Brand } from "../../models/brand"
import { BrandService } from "../../services/brand-service"
import { ModelService } from "../../services/model-service"

import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  delete: Boolean
  brands: Observable<Brand[]>;
  private roles: string[];


  constructor(private brandService: BrandService, private modelService: ModelService,
    private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
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
    this.reloadData();
  }

  reloadData() {
    this.brands = this.brandService.getBrandList();
  }
  findModelByBrand(id: number) {
    this.modelService.findByBrand(id).subscribe(data => {
      if (data == true) {
        this.delete = true
      }
      else { this.deleteBrand(id) }

    })
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
