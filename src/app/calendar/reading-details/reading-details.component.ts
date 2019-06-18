import { Component, OnInit } from '@angular/core';
import { Chapter } from '../../shared/chapter.model'

@Component({
  selector: 'app-reading-details',
  templateUrl: './reading-details.component.html',
  styleUrls: ['./reading-details.component.css']
})
export class ReadingDetailsComponent implements OnInit {
  chaptersRead: Chapter[] = [
    new Chapter('Genesis', 1)
  ];

  constructor() { }

  ngOnInit() {
  }

    onAddChapterRead(chap: {book: string, chapter: number}) {
    this.chaptersRead.push({
      book: chap.book,
      chapter: chap.chapter
    });
  }

}