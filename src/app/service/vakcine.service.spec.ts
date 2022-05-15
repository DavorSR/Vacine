import { TestBed } from '@angular/core/testing';

import { VakcineService } from './vakcine.service';

describe('VakcineService', () => {
  let service: VakcineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VakcineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
