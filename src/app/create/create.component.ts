import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChapterReadService } from '../shared/chapter-read.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(private chapterReadService: ChapterReadService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }
  addIssue(title, responsible, description, severity) {
    this.chapterReadService.addIssue(title, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
  ngOnInit() {
  }
}