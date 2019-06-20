import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePopulatorComponent } from './calendar/date-populator/date-populator.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ReadingDetailsComponent } from './calendar/reading-details/reading-details.component';
import { ReadingDetailsEditComponent } from './calendar/reading-details/reading-details-edit/reading-details-edit.component';
import { ChapterReadService } from './shared/chapter-read.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule 
  ],
  declarations: [ 
    AppComponent, 
    CalendarComponent, 
    DatePopulatorComponent, 
    HeaderComponent, 
    DropdownDirective, 
    ReadingDetailsComponent, 
    ReadingDetailsEditComponent 
  ],
  providers:    [ ChapterReadService ], 
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
