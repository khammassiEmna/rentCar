import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TailwindCompoComponent } from './tailwind-compo/tailwind-compo.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component'
import { carAddComponent } from './car/car-add/car-add.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from './brand/update-brand/update-brand.component';
import { ListCarComponent } from './car/list-car/list-car.component';
import { ModelAddComponent } from './model/model-add/model-add.component';
import { ModelUpdateComponent } from './model/model-update/model-update.component';
import { ListModelComponent } from './model/list-model/list-model.component';
import { AdminlistCarComponent } from './car/adminlist-car/adminlist-car.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import { PasswordValidationComponent } from './password-validation/password-validation.component';
import { ReservationAddComponent } from './reservation/reservationAdd/reservation-add.component';
import { NextReservationComponent } from './reservation/next-reservation/next-reservation.component';
import { OldReservationComponent } from './reservation/old-reservation/old-reservation.component';
import { ReservationOfThedayComponent } from './reservation/reservation-of-theday/reservation-of-theday.component';
import { ReturnOfTheDayComponent } from './reservation/return-of-the-day/return-of-the-day.component';
import { ReserDetailsComponent } from './reservation/reser-details/reser-details.component';


import { BrandNavBarComponent } from './brand/brand-nav-bar/brand-nav-bar.component';
import { ClientNavBarComponent } from './client-nav-bar/client-nav-bar.component';
import { ResrvationNavBarComponent } from './resrvation-nav-bar/resrvation-nav-bar.component';
import { CarNavBarComponent } from './car/car-nav-bar/car-nav-bar.component';
import { ModelNavBarComponent } from './model/model-nav-bar/model-nav-bar.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';

import { from } from 'rxjs';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'pm', component: PmComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'listBrand', component: BrandListComponent },
  { path: 'addBrand', component: AddBrandComponent },
  { path: 'update/:id', component: UpdateBrandComponent },
  { path: 'details/:id', component: UpdateBrandComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'addCar', component: carAddComponent },
  { path: 'listCar', component: ListCarComponent },
  { path: 'addModel', component: ModelAddComponent },
  { path: 'modelDetails/:id', component: ModelUpdateComponent },
  { path: 'forbiden', component: TailwindCompoComponent },
  { path: 'notConfirmed', component: ReservationListComponent },
  { path: 'listModel', component: ListModelComponent },
  { path: 'adminListCar', component: AdminlistCarComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'clientList', component: ListClientComponent },
  { path: 'reservationNavBar', component: ResrvationNavBarComponent },
  { path: 'updateProfil', component: UpdateProfilComponent },
  { path: 'modelNavBar', component: ModelNavBarComponent },
  { path: 'brandNavBar', component: BrandNavBarComponent },
  { path: 'carNavBar', component: CarNavBarComponent },
  { path: 'clientNavBar', component: ClientNavBarComponent },
  { path: 'passwordValidation', component: PasswordValidationComponent },
  { path: 'addReservation/:id', component: ReservationAddComponent },
  { path: 'nextReservation', component: NextReservationComponent },
  { path: 'oldReservation', component: OldReservationComponent },
  { path: 'reservOfTheDay', component: ReservationOfThedayComponent },
  { path: 'returns', component: ReturnOfTheDayComponent },
  { path: 'reservDetails/:id', component: ReserDetailsComponent },
  { path: 'reservByUser', component: UserReservationComponent },

  { path: '', redirectTo: 'listCar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }