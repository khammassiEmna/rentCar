import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand-service';
import { ModelService } from 'src/app/services/model-service';

@Component({
  selector: 'app-model-update',
  templateUrl: './model-update.component.html',
  styleUrls: ['./model-update.component.css']
})
export class ModelUpdateComponent implements OnInit {

  id: number;
  model: Model;
  brands: Observable<Brand[]>
  brandId: Brand
  constructor(private route: ActivatedRoute, private router: Router,
    private brandService: BrandService, private modelService: ModelService) { }

  ngOnInit() {
    this.model = new Model();
    this.brands = this.brandService.getBrandList();
    this.id = this.route.snapshot.params['id'];

    this.modelService.getModel(this.id)
      .subscribe(data => {
        console.log(data)
        this.model = data;
      }, error => console.log(error));
  }

  updateModel() {
    console.log("the brand name", this.brandId.name);
    this.model.brand = this.brandId;
    this.modelService.updateModel(this.id, this.model)
      .subscribe(data => {
        console.log(data);
        this.model = new Model();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateModel();
  }

  gotoList() {
    this.router.navigate(['/listModel']);
  }

}