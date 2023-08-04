import { TestBed } from '@angular/core/testing';

import { MySpaceService } from './my-space.service';

describe('MySpaceService', () => {
  let service: MySpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
