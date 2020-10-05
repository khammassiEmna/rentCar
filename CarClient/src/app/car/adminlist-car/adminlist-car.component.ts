import { carService } from "../../services/car-service"
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-adminlist-car',
  templateUrl: './adminlist-car.component.html',
  styleUrls: ['./adminlist-car.component.css']
})
export class AdminlistCarComponent implements OnInit {
  reservedCar: Boolean;
  cars: Observable<Car[]>;
  modelName: string;
  private roles: string[];

  constructor(private carService: carService,
    private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
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
    this.cars = this.carService.getCarList();
  }

  relodData() {
    this.cars = this.carService.getCarList();

  }
  getCarByModel(): void {
    console.log("le modele", this.modelName);
    this.cars = this.carService.getByModel(this.modelName);
  }

  reserver(id: number) {
    this.router.navigate(['/addReservation', id]);

  }
  delete(id: number) {
    this.reservedCar = false
    this.carService.deleteCar(id).subscribe(data => {
      if (data == false) {
        this.reservedCar = true

      } else
        this.relodData()
    })
  }
}
