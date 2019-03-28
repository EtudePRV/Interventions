import { TestBed } from '@angular/core/testing';

import { TypeProblemeService } from './typeprobleme.service';

describe('TypeproblemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeProblemeService = TestBed.get(TypeProblemeService);
    expect(service).toBeTruthy();
  });
});
