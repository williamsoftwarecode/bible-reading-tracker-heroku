import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { ChapterReadService } from '../shared/chapter-read.service';
import { ChapterRead } from '../shared/chapter-read.model'
// import * as data from '../../../shared/ot-books.json';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  chaptersRead: ChapterRead[] = [];
  displayedColumns = ['dateColumn', 'bookColumn', 'chapterColumn', 'actions'];

  constructor(private chapterReadService: ChapterReadService) { }

  ngOnInit() {
    this.fetchChapterRead();
  }

  fetchChapterRead() {
    this.chapterReadService
    .getIssues()
    .subscribe((data: ChapterRead[]) => {
      this.chaptersRead = data;
      console.log('Data requested ... ');
      
      for(var i=0; i<this.chaptersRead.length; i++) {
        this.chaptersRead[i].date = this.convertStringToDate(this.chaptersRead[i].date);
      }

      console.log(this.chaptersRead);
    });
  }

  convertStringToDate(dateString: Date) {
    return new Date(dateString);
  }
}