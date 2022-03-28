import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visible = false;
  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.visible = !this.visible;
  }
}
