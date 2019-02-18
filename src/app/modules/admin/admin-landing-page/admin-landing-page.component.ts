import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.scss']
})
export class AdminLandingPageComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/outline-settings-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'build',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/outline-build-24px.svg'
      )
    );
  }
}
