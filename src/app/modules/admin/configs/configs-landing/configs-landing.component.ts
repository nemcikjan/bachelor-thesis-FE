import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-configs-landing',
  templateUrl: './configs-landing.component.html',
  styleUrls: ['./configs-landing.component.scss']
})
export class ConfigsLandingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'light',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/lightbulb-solid.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'running',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/running-solid.svg')
    );
    iconRegistry.addSvgIcon(
      'wind',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wind-solid.svg')
    );
  }

  ngOnInit() {}

  navigateToChild(type: string) {
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: { type }
    });
  }
}
