import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  years: number[] = [2020, 2019, 2018];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  yearSelected: number = new Date().getFullYear();
  monthSelected: string = this.months[new Date().getMonth()];

  constructor() { }

  ngOnInit() {
  }

  onSelectDate() {
    alert('Hi');
  }

  OnSelectYear(year: number) {
    this.yearSelected = year;
  }

  OnSelectMonth(month: string) {
    this.monthSelected = month;
  }
}