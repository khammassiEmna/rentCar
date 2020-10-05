import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandService } from 'src/app/services/brand-service';
import { ModelService } from 'src/app/services/model-service';
import { Brand } from 'src/app/models/brand';
import { Model } from 'src/app/models/model';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.css']
})



export class ModelAddComponent implements OnInit {
  brands: Observable<Brand[]>;
  exist: Boolean;
  model: Model = new Model();
  addButton: Boolean;
  listButton: Boolean;
  b: Brand = new Brand();
  private message: String;
  submitted = false;
  brandId: string;
  brandNotFound: Boolean
  constructor(private httpClient: HttpClient, private brandService: BrandService, private modelService: ModelService, private router: Router) { }

  ngOnInit(): void {
    this.addButton = false;
    this.listButton = false;
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrandList().subscribe(data => {
      if (data == null) {
        this.brandNotFound = true
      } else { this.brands = data }

    });


    this.brandService.getBrandList();
  }

  add() {
    this.listButton = false;
    this.addButton = true;

  }
  newEmployee(): void {
    this.submitted = false;
    this.model = new Model();
  }
  findByName() {
    this.modelService.findByName(this.model.name).subscribe(data => {
      if (data == true) {
        this.exist = true
      }
      else this.save()
    })
  }
  save() {
    this.submitted = true;

    this.model.brand = this.b;
    this.modelService.createModel(this.model, this.brandId).subscribe(data => {

      this.model = new Model();
      this.router.navigate(['listModel']);
    })




  }
  onSubmit() {
    this.findByName();

  }

  gotoList() {


  }
}
