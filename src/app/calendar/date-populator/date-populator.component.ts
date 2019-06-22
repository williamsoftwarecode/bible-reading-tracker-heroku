import { Component, OnInit, Input, DoCheck, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-date-populator',
  templateUrl: './date-populator.component.html',
  styleUrls: ['./date-populator.component.css']
})
export class DatePopulatorComponent implements OnInit {
  @Output() onSelecteDateOnCalendar = new EventEmitter<{date: number, month: string, year: number}>();
  @Input('inputYear') inputYear: number;
  @Input('inputMonth') inputMonth: string;
  @Input('inputDate') inputDate: number;

  dateSelected: number;

  arrayOfDates: number[] = [];
  arrayOfDatesFirstWeek: number[] = [];
  arrayOfDatesSecondWeek: number[] = [];
  arrayOfDatesThirdWeek: number[] = [];
  arrayOfDatesFourthWeek: number[] = [];
  arrayOfDatesFifthWeek: number[] = [];
  arrayOfDatesSixthWeek: number[] = [];
  numOfWeeksInMonth: number;
  numOfDaysInMonth: number;
  allWeeks: number[][] = [];

  num: number;
  sNum: string;
  yearDigits: number[] = [];

  dayOfWeek: number;
  f: number;
  dateOfMonth: number = 1;
  monthNum: number;  
  lastTwoDigitsOfYear: number;
  century: number;

  displayedColumns: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  constructor() { }

  ngOnInit() {
    this.dateSelected = this.inputDate;
  }

  onSelectDate(date: number) {
    if (date !== null) {
      // alert(date);
      this.dateSelected = date;
    }
  }

  ngDoCheck() {

    // Convert year to digits to calculate century and lastTwoDigitsOfYear
    this.num = this.inputYear;
    this.sNum = this.num.toString();
    this.yearDigits = [];
    
    for (var i = 0; i < this.sNum.length; i += 1) {
      this.yearDigits.push(
        +this.sNum.charAt(i)
      );
    }

    this.century=+this.yearDigits.slice(0,2).join("");
    this.lastTwoDigitsOfYear=+this.yearDigits.slice(2,4).join("");

    // Convert month to monthNum
    switch(this.inputMonth) { 
      case "January": { 
        this.monthNum=11;
        this.lastTwoDigitsOfYear-=1; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      case "February": { 
        this.monthNum=12;
        this.lastTwoDigitsOfYear-=1; 
        if (this.inputYear%4 == 0) {
          // If leap year (does not account for divisibility by 100 years and 400 years)
          this.numOfDaysInMonth=29;
        } else {
          this.numOfDaysInMonth=28;
        }
        break; 
      } 
      case "March": { 
        this.monthNum=1; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      case "April": { 
        this.monthNum=2; 
        this.numOfDaysInMonth=30;
        break; 
      } 
      case "May": { 
        this.monthNum=3; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      case "June": { 
        this.monthNum=4; 
        this.numOfDaysInMonth=30;
        break; 
      } 
      case "July": { 
        this.monthNum=5;
        this.numOfDaysInMonth=31; 
        break; 
      } 
      case "August": { 
        this.monthNum=6; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      case "September": { 
        this.monthNum=7; 
        this.numOfDaysInMonth=30;
        break; 
      } 
      case "October": { 
        this.monthNum=8; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      case "November": { 
        this.monthNum=9; 
        this.numOfDaysInMonth=30;
        break; 
      } 
      case "December": { 
        this.monthNum=10; 
        this.numOfDaysInMonth=31;
        break; 
      } 
      default: { 
          ; 
          break; 
      } 
    } 


    // Use Zeller's Rule to determine day of month
    this.f = this.dateOfMonth + Math.floor((13*this.monthNum-1)/5) + this.lastTwoDigitsOfYear + Math.floor(this.lastTwoDigitsOfYear/4) + Math.floor(this.century/4) - 2*this.century; 

    this.dayOfWeek = this.f%7;

    if (this.dayOfWeek < 0) {
      this.dayOfWeek=this.dayOfWeek+7;
    }

    // Add spaces for blank dates
    this.arrayOfDates = []; 
    for (var i = 0; i < this.dayOfWeek; i++) {
      this.arrayOfDates.push(i);
    }
    
    // Add spaces for blank dates
    this.arrayOfDates = []; 
    for (var i = 0; i < this.dayOfWeek; i++) {
      this.arrayOfDates.push(null);
    }    

    // Add numbers for actual dates
    for (var i = 0; i < this.numOfDaysInMonth; i++) {
      this.arrayOfDates.push(i+1);
    }

    // Calculate number of weeks in month to display on calendar
    this.numOfWeeksInMonth=Math.ceil(this.arrayOfDates.length/7);

    // Split array based on week number
    this.arrayOfDatesFirstWeek=this.arrayOfDates.slice(0,7);
    this.arrayOfDatesSecondWeek=this.arrayOfDates.slice(7,14);
    this.arrayOfDatesThirdWeek=this.arrayOfDates.slice(14,21);
    this.arrayOfDatesFourthWeek=this.arrayOfDates.slice(21,28);
    this.arrayOfDatesFifthWeek=this.arrayOfDates.slice(28,35);
    this.arrayOfDatesSixthWeek=this.arrayOfDates.slice(35);

    // Fill last week with empty slots
    for (var i = this.arrayOfDatesFifthWeek.length; i < 7; i++) {
      this.arrayOfDatesFifthWeek.push(null);
    }   
    for (var i = this.arrayOfDatesSixthWeek.length; i < 7; i++) {
      this.arrayOfDatesSixthWeek.push(null);
    }   

    this.allWeeks = [];
    this.allWeeks.push(this.arrayOfDatesFirstWeek);
    this.allWeeks.push(this.arrayOfDatesSecondWeek);
    this.allWeeks.push(this.arrayOfDatesThirdWeek);
    this.allWeeks.push(this.arrayOfDatesFourthWeek);
    this.allWeeks.push(this.arrayOfDatesFifthWeek);
    this.allWeeks.push(this.arrayOfDatesSixthWeek);

    // Reset date if more than the number of days in month 
    if (this.dateSelected > this.numOfDaysInMonth) {
      this.dateSelected = undefined;
    }

    this.onSelecteDateOnCalendar.emit({
      date: this.dateSelected,
      month: this.inputMonth,
      year: this.inputYear
    });
  }
}
