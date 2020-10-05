import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {

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
        this.errorMessage = "Inscription effectué avec succés veuillez vous connecter!";
        this.isSignUpFailed = true;
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