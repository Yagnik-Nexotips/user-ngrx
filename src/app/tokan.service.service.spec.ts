import { TestBed } from '@angular/core/testing';

import { TokanServiceService } from './tokan.service.service';

describe('TokanServiceService', () => {
  let service: TokanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
