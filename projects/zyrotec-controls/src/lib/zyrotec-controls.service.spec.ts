import { TestBed } from '@angular/core/testing';

import { ZyrotecControlsService } from './zyrotec-controls.service';

describe('ZyrotecControlsService', () => {
  let service: ZyrotecControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZyrotecControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
