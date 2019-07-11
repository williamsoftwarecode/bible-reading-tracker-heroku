import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { ChapterReadService } from '../shared/chapter-read.service';
import { ChapterRead } from '../shared/chapter-read.model'
import * as data from '../shared/ot-books.json';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  chaptersRead: ChapterRead[] = [];
  displayedColumns = ['dateColumn', 'bookColumn', 'chapterColumn', 'actions'];

  booksFromDatabase: string[] = [];
  distinctBooks: string[] = [];
  chaptersOfDistinctBooks: number[][] = [];
  totalChaptersOfDistinctBooks: number[] = [];
  progressOfDistinctBooks: number[] = [];

  ot = (<any>data).books;

  constructor(private chapterReadService: ChapterReadService) { }

  ngOnInit() {
    this.fetchChapterRead();
  }

  fetchChapterRead() {
    this.chapterReadService
    .getIssues()
    .subscribe((data: ChapterRead[]) => {
      this.chaptersRead = data;
      // console.log('Data requested ... ');
      
      for(var i=0; i<this.chaptersRead.length; i++) {
        this.chaptersRead[i].date = this.convertStringToDate(this.chaptersRead[i].date);
      }

      this.storeLocalCache();
      // console.log(this.chaptersRead);
    });
  }

  deleteDate(dateToDelete: Date) {
    this.chapterReadService
    .deleteIssue(dateToDelete)
    .subscribe(() => {
      this.fetchChapterRead();
    });
  }

  convertStringToDate(dateString: Date) {
    return new Date(dateString);
  }

  storeLocalCache() {
    this.booksFromDatabase = [];
    // console.log(this.chaptersRead);
    this.chaptersRead.forEach(el => {
      // console.log(el.date);
      el.read.forEach(element => {
        // Check for duplicates - if not in array, add to array
        // this.booksFromDatabase.indexOf(element) === -1 ? this.booksFromDatabase.push(element) : console.log("This item already exists");
        this.booksFromDatabase.push(element)
        // console.log(this.booksFromDatabase);
        this.splitBooksFromChapters();
      });
    });
  }

  splitBooksFromChapters() {
    
    // Initialise distinctBooks and chaptersOfDistinctBooks
    this.distinctBooks = [];
    this.chaptersOfDistinctBooks = [];
    this.totalChaptersOfDistinctBooks = [];
    this.progressOfDistinctBooks = [];

    this.booksFromDatabase.forEach(element => {
      var splitted = [];
      var bookToAdd = "";
      var chapterToAdd = null;

      splitted = element.split(" "); 

      if (splitted.length === 2) {
        bookToAdd = splitted[0];
        chapterToAdd = +splitted[1];
      } else if (splitted.length === 3){
        bookToAdd = splitted[0] + " " + splitted[1];
        chapterToAdd = +splitted[2];
      } else {
        bookToAdd = splitted[0] + " " + splitted[1] + " " + splitted[2];
        chapterToAdd = +splitted[3];
      }

      // console.log(bookToAdd);
      // console.log(chapterToAdd);
      
      var indexOfBookInDistinctBook = this.distinctBooks.indexOf(bookToAdd);
      // console.log(indexOfBookInDistinctBook);
      // Check if book is distinct - if yes, add new index 
      if (indexOfBookInDistinctBook === -1) {
        this.distinctBooks.push(bookToAdd);
        this.chaptersOfDistinctBooks.push([]);
        this.chaptersOfDistinctBooks[this.distinctBooks.length-1].push(chapterToAdd);
        
        this.ot.forEach(element => {
          if (bookToAdd === element.name) {
            this.totalChaptersOfDistinctBooks.push(element.chapters);
          }
        });

      } else {
        // If not, add chapter to index 
        // Check for duplicates - if not in array, add to array
        this.chaptersOfDistinctBooks[indexOfBookInDistinctBook].indexOf(chapterToAdd) === -1 ? this.chaptersOfDistinctBooks[indexOfBookInDistinctBook].push(chapterToAdd) : console.log();
        // this.chaptersOfDistinctBooks[indexOfBookInDistinctBook].push(chapterToAdd);
      }
    });

    for (var i = 0; i < this.totalChaptersOfDistinctBooks.length; i++) {
      this.progressOfDistinctBooks[i] = 100 * this.chaptersOfDistinctBooks[i].length / this.totalChaptersOfDistinctBooks[i];
    }

    // TODO: Sort distinctBooks by progress

    console.log(this.distinctBooks);
    console.log(this.chaptersOfDistinctBooks);
    console.log(this.totalChaptersOfDistinctBooks);
    console.log(this.progressOfDistinctBooks);
  }
}
