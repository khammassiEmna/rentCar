import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { User } from '../models/user';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit {
  username: string
  id: string
  form: User
  used: Boolean
  user: Boolean;
  private roles: string[];
  constructor(private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new User();
    this.roles = this.tokenStorage.getAuthorities();
    this.username = this.tokenStorage.getUsername();
    this.authService.getByuserName(this.username)
      .subscribe(data => {
        this.form = data
        this.roles.every(role => {
          if (role === 'user') {
            this.user = true;
          }
        })

      }, error => console.log(error));
  }
  onSubmit() {
    this.authService.userUpdate(this.username, this.form).subscribe(data => {
      if (data == false) {
        this.used = true
      }
      else {
        this.roles.every(role => {
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/home']);
          }
          else if (role === 'user') {
            this.router.navigate(['/listCar']);
          }
        })


      }
    }, error => console.log(error));;
  }
}
