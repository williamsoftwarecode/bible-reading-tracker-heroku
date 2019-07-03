import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bible-reading-tracker-heroku';
  loadedFeature: string;

  ngOnInit() {
    this.loadedFeature = 'calendar';
  }

  onFeatureSelected(feature: string) {
    this.loadedFeature = feature;
  }
}
