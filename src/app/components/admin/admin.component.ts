import { AuthenticationService } from './../../service/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
