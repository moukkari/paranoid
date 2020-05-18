import { TestBed } from '@angular/core/testing';

import { SetlistfmService } from './setlistfm.service';

describe('SetlistfmService', () => {
  let service: SetlistfmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetlistfmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
