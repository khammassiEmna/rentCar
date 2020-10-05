import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  private roles: string[];
  users: Observable<any>;
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role != 'ROLE_ADMIN') {
          this.router.navigate(['signup']);

        }
      });
    } else {
      this.router.navigate(['auth/login']);

    }
    this.getClient();
  }
  getClient(): void {
    this.users = this.authService.getAll();

  }
  deleteUser(id: number) {
    return this.authService.deleteUser(id).subscribe(
      data => {
        console.log(data);
        this.getClient();
      },
      error => console.log(error));
  }
}
