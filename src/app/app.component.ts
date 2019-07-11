import { Component, OnInit } from '@angular/core';
// import {DomSanitizer} from '@angular/platform-browser';
// import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bible-reading-tracker-heroku';
  loadedFeature: string;

  // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon(
  //     'calendar-icon',
  //     sanitizer.bypassSecurityTrustResourceUrl('./assets/calendar.svg'));
  //   iconRegistry.addSvgIcon(
  //     'view-chart-icon',
  //     sanitizer.bypassSecurityTrustResourceUrl('./assets/analytics.svg'));
  //   iconRegistry.addSvgIcon(
  //     'history-icon',
  //     sanitizer.bypassSecurityTrustResourceUrl('./assets/list.svg'));
  // }

  ngOnInit() {
    this.loadedFeature = 'calendar';
  }

  onFeatureSelected(feature: string) {
    this.loadedFeature = feature;
  }
}
