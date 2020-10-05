import { AuthService } from '../../auth/auth.service';
import { SignUpInfo } from '../../auth/signup-info';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  private roles: string[];

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

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

  }
  onSubmit() {
    console.log("fullName", this.form.fullName)
    console.log("email", this.form.email)
    console.log("userName", this.form.username)
    console.log("password", this.form.password)
    console.log("permis", this.form.permis)

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.username,
      this.form.password,
      this.form.permis

    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/clientList']);

      },
      error => {
        console.log("formulaiiiiiiiire", this.form);

        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
