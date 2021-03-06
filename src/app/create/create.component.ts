import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { ChapterReadService } from '../shared/chapter-read.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(private chapterReadService: ChapterReadService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }
  addIssue(title, responsible, description, severity) {
    this.chapterReadService.addChapterRead(title, title, title).subscribe(() => {
      alert("addIssue()");
    });
  }
  ngOnInit() {
  }
}