import { AuthService } from './modules/auth/service/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { GatewayService } from './modules/main/service/gateway.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bachelor-iot-web-app';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  onClick() {
    this.http.get('api').subscribe(res => console.log(res));
  }

  navigate() {
    this.router.navigate(['auth']);
  }

  navigateToConfig() {
    console.log('asdsd');
    this.router.navigate(['admin/config']);
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
