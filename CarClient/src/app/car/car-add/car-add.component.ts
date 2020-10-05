import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Brand } from '../../models/brand';
import { BrandService } from "../../services/brand-service"
import { Model } from 'src/app/models/model';
import { ModelService } from 'src/app/services/model-service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class carAddComponent implements OnInit {
  models: Observable<Model[]>;
  private roles: string[];
  constructor(private tokenStorage: TokenStorageService, private httpClient: HttpClient, private modelService: ModelService, private router: Router) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  modelId: string;
  matricule: string;
  creationYear: string;
  price: string
  modelNotFound
  //Gets called when the user selects an image

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }
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
    this.getBrands();
  }

  getBrands() {

    this.modelService.getModelList().subscribe(data => {
      if (data == null) { this.modelNotFound = true }
      else this.models = data;
    });
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {


    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('modelId', this.modelId);
    uploadImageData.append('creationYear', this.creationYear);
    uploadImageData.append("matricule", this.matricule);

    uploadImageData.append("price", this.price);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8085/car/add', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          this.router.navigate(['/adminListCar']);
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8085/car/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          console.log("bytessss ", this.base64Data);
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
