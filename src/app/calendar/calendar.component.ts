import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  years: number[] = [2020, 2019, 2018];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  today = new Date();
  yearSelected: number = this.today.getFullYear();
  monthSelected: string = this.months[this.today.getMonth()];
  dateSelected: number = this.today.getDate();
  refreshDatePopulator: boolean;

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

  onDateSelectedOnCalendar(fullDate: {date: number, month: string, year: number}) {
    this.dateSelected = fullDate.date;
  }

  onAddChapterRead(chap: {refresh: boolean}) {
    this.refreshDatePopulator = chap.refresh;
  }
}