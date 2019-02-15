import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
}
