import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import * as data from '../../../shared/ot-books.json';

@Component({
  selector: 'app-reading-details-edit',
  templateUrl: './reading-details-edit.component.html',
  styleUrls: ['./reading-details-edit.component.css']
})
export class ReadingDetailsEditComponent implements OnInit {
  @ViewChild('bookInput', {static: true}) bookInputRef: ElementRef;
  @ViewChild('chapterInput', {static: true}) chapterInputRef: ElementRef;
  @Output() chapterReadAdded = new EventEmitter<{book: string, chapter: number}>();
  
  // Array of books in OT
  otBooks: string[] = [];
  // Array of chapters in the books in OT
  otChapters: number[] = [];

  // Array of chapters of selected book
  bookChapters: number[] = [];
  // Number of chapters of selected book
  numChaptersOfSelected: number;

  bookSelected: string;
  chapterSelected: number;

  constructor() { }

  ngOnInit() {
    let ot = (<any>data).books;
    this.otBooks=[];
    this.otChapters=[];

    for(var i=0; i<ot.length; i++) {
      this.otBooks[i]=ot[i].name;
      this.otChapters[i]=ot[i].chapters;
    }

    // Initialise book
    this.bookSelected=this.otBooks[0];
    this.numChaptersOfSelected=this.otChapters[this.otBooks.indexOf(this.otBooks[0])];
    this.bookChapters=[];
    for(var i=0; i<this.numChaptersOfSelected; i++){
      this.bookChapters[i]=i+1;
    }
    this.chapterSelected=1;
  }

  OnSelectBook(book: string) {
    this.bookSelected = book;
    this.numChaptersOfSelected=this.otChapters[this.otBooks.indexOf(book)];
    this.bookChapters=[];
    for(var i=0; i<this.numChaptersOfSelected; i++){
      this.bookChapters[i]=i+1;
    }
  }

  OnSelectChapter(chapter: number) {
    this.chapterSelected = chapter;
  }

  onAddChapter() {
    this.chapterReadAdded.emit({
      // book: this.bookInputRef.nativeElement.value,
      // chapter: this.chapterInputRef.nativeElement.value
      book: this.bookSelected,
      chapter: this.chapterSelected
    });
  }
}