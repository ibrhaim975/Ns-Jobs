import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesMeetingsComponent } from './committees-meetings.component';

describe('CommitteesMeetingsComponent', () => {
  let component: CommitteesMeetingsComponent;
  let fixture: ComponentFixture<CommitteesMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteesMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteesMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
