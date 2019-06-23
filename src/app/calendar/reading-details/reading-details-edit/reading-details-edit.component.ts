import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { ChapterReadService } from '../../../shared/chapter-read.service';
import * as data from '../../../shared/ot-books.json';

@Component({
  selector: 'app-reading-details-edit',
  templateUrl: './reading-details-edit.component.html',
  styleUrls: ['./reading-details-edit.component.css']
})
export class ReadingDetailsEditComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bookInput', {static: true}) bookInputRef: ElementRef;
  @ViewChild('chapterInput', {static: true}) chapterInputRef: ElementRef;
  @ViewChild('bookSelect', {static: true}) bookSelect: MatSelect;
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
  
  addForm: FormGroup;

  /** control for the selected book */
  bookCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  bookFilterCtrl: FormControl = new FormControl();

  /** list of books filtered by search keyword */
  public filteredBooks: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  
  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  constructor(private chapterReadService: ChapterReadService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      bookRead: ['', Validators.required],
      chapterRead: '',
    });
  }

  // TODO
  addIssue() {
    // this.chapterReadService.addIssue(title, responsible, description, severity).subscribe(() => {
    //   alert("addIssue()");
    // });
  }

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

    // set initial selection
    // this.bookCtrl.setValue(this.bookSelected);

    // load the initial bank list
    this.filteredBooks.next(this.otBooks.slice());

    // listen for search field value changes
    this.bookFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBooks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
  * Sets the initial value after the filteredBanks are loaded initially
  */
  protected setInitialValue() {
    this.filteredBooks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBooks are loaded initially
        // and after the mat-option elements are available
        this.bookSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  protected filterBooks() {
    if (!this.otBooks) {
      return;
    }
    // get the search keyword
    let search = this.bookFilterCtrl.value;
    if (!search) {
      this.filteredBooks.next(this.otBooks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the books
    this.filteredBooks.next(
      this.otBooks.filter(book => book.toLowerCase().indexOf(search) > -1)
    );
    console.log(this.filteredBooks);
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