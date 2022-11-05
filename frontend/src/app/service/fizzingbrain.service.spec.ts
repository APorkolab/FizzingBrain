import { TestBed } from '@angular/core/testing';

import { FizzingbrainService } from './fizzingbrain.service';

describe('FizzingbrainService', () => {
  let service: FizzingbrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FizzingbrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
