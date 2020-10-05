import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { Observable } from 'rxjs';
import { ModelService } from 'src/app/services/model-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.css']
})
export class ListModelComponent implements OnInit {
  updateButton: Boolean;
  listButton: Boolean;
  models: Observable<Model[]>;
  errorMsg: Boolean

  constructor(private modelService: ModelService,
    private router: Router) { }

  ngOnInit() {
    this.listButton = false;
    this.reloadData();
  }

  reloadData() {
    this.models = this.modelService.getModelList();
  }

  deleteModel(id: number) {
    this.errorMsg = false
    this.modelService.deleteModel(id)
      .subscribe(
        data => {
          console.log(data)
          if (data == false)
            this.errorMsg = true;
          else
            this.reloadData();
        },
        error => console.log(error));
  }

  modelDetails(id: number) {
    this.router.navigate(['modelDetails', id]);
  }


}

