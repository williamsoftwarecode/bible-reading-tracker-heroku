import { TestBed } from '@angular/core/testing';

import { ChapterReadService } from './chapter-read.service';

describe('ChapterReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChapterReadService = TestBed.get(ChapterReadService);
    expect(service).toBeTruthy();
  });
});
