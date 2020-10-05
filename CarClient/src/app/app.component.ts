import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  public authority: string;
  public open: boolean
  public userName: string;
  private dropdown: Boolean;
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }
  logout() {
    this.tokenStorage.signOut();

    this.router.navigate(['auth/login']).then(() => {
      location.reload()
    })

  }
  ngOnInit() {
    this.open = false;
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
      this.userName = this.tokenStorage.getUsername();
      console.log(this.userName)

    }
  }
  loginPage() {

    this.router.navigate(['auth/login']);


  }
  profil(): void {

    this.router.navigate(['passwordValidation']);
  }

  userReserv(): void {

    this.router.navigate(['reservByUser']);
  }
  dropdownControl(): void {
    this.dropdown = !this.dropdown;
  }

}