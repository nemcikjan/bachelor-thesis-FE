import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });

  hide = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    const data = this.loginForm.value;

    return this.authService.login(data).subscribe();
  }
}
