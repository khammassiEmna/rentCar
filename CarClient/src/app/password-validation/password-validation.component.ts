import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',

})
export class PasswordValidationComponent implements OnInit {
  password: string;
  username: string;
  similar: Boolean;
  constructor(private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUsername();

  }

  passwordValidation(): void {
    this.authService.passwordCheck(this.username, this.password)
      .subscribe(data => {
        if (data == false) {
          this.similar = true;
        }
        else {
          this.router.navigate(['/updateProfil']);
        }
      }, error => console.log(error));
  }

}
