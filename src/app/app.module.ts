import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatTableModule, 
  MatDividerModule, 
  MatSnackBarModule,
  MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePopulatorComponent } from './calendar/date-populator/date-populator.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ReadingDetailsComponent } from './calendar/reading-details/reading-details.component';
import { ReadingDetailsEditComponent } from './calendar/reading-details/reading-details-edit/reading-details-edit.component';
import { ChapterReadService } from './shared/chapter-read.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatMenuModule,
    NgxMatSelectSearchModule
  ],
  declarations: [ 
    AppComponent, 
    CalendarComponent, 
    DatePopulatorComponent, 
    HeaderComponent, 
    DropdownDirective, 
    ReadingDetailsComponent, 
    ReadingDetailsEditComponent, 
    CreateComponent, 
    HistoryComponent 
  ],
  providers:    [ ChapterReadService ], 
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
