import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { carAddComponent } from './car/car-add/car-add.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandDetailsComponent } from './brand/brand-details/brand-details.component';
import { UpdateBrandComponent } from './brand/update-brand/update-brand.component';
import { ListCarComponent } from './car/list-car/list-car.component';
import { ModelAddComponent } from './model/model-add/model-add.component';
import { ModelUpdateComponent } from './model/model-update/model-update.component';
import { TailwindCompoComponent } from './tailwind-compo/tailwind-compo.component';
import { ReservationAddComponent } from './reservation/reservationAdd/reservation-add.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ModelNavBarComponent } from './model/model-nav-bar/model-nav-bar.component';
import { ListModelComponent } from './model/list-model/list-model.component';
import { BrandNavBarComponent } from './brand/brand-nav-bar/brand-nav-bar.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CarNavBarComponent } from './car/car-nav-bar/car-nav-bar.component';
import { AdminlistCarComponent } from './car/adminlist-car/adminlist-car.component';
import { ClientNavBarComponent } from './client-nav-bar/client-nav-bar.component';
import { ResrvationNavBarComponent } from './resrvation-nav-bar/resrvation-nav-bar.component';
import { UpdateProfilComponent } from './update-profil/update-profil.component';
import { PasswordValidationComponent } from './password-validation/password-validation.component';
import { OldReservationComponent } from './reservation/old-reservation/old-reservation.component';
import { NextReservationComponent } from './reservation/next-reservation/next-reservation.component';
import { ReservationOfThedayComponent } from './reservation/reservation-of-theday/reservation-of-theday.component';
import { ReturnOfTheDayComponent } from './reservation/return-of-the-day/return-of-the-day.component';
import { ReserDetailsComponent } from './reservation/reser-details/reser-details.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    carAddComponent,
    AddBrandComponent,
    BrandListComponent,
    BrandDetailsComponent,
    UpdateBrandComponent,
    ListCarComponent,
    ModelAddComponent,

    ModelUpdateComponent,
    TailwindCompoComponent,
    ReservationAddComponent,
    ReservationListComponent,
    ModelNavBarComponent,
    ListModelComponent,
    BrandNavBarComponent,
    AddClientComponent,
    ListClientComponent,
    CarNavBarComponent,
    AdminlistCarComponent,
    ClientNavBarComponent,
    ResrvationNavBarComponent,
    UpdateProfilComponent,
    PasswordValidationComponent,
    OldReservationComponent,
    NextReservationComponent,
    ReservationOfThedayComponent,
    ReturnOfTheDayComponent,
    ReserDetailsComponent,
    UserReservationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
