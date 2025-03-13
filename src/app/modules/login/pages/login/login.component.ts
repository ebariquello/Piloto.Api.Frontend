import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    document.body.className = 'is--login';
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
