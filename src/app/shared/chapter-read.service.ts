import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChapterReadService {
  uri = 'http://bible-reading-tracker.herokuapp.com';
  constructor(private http: HttpClient) {
  }
  addChapterRead(date, bookSelected, chapterSelected) {
    const input = {
      date: date,
      bookSelected: bookSelected,
      chapterSelected: chapterSelected
    };
    return this.http.post(`${this.uri}/date/add`, input);
  }
  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }
  getChaptersReadByDate(date) {
    return this.http.get(`${this.uri}/date/${encodeURIComponent(date.toISOString())}`);
  }
  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/issues/update/${title}`, issue);
  }
  deleteIssue(date) {
    return this.http.get(`${this.uri}/issues/delete/${encodeURIComponent(date.toISOString())}`);
  }
}