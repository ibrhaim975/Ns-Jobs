import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesDetailsComponent } from './committees-details.component';

describe('CommitteesDetailsComponent', () => {
  let component: CommitteesDetailsComponent;
  let fixture: ComponentFixture<CommitteesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
