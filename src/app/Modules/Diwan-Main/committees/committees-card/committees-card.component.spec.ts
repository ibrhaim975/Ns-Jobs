import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesCardComponent } from './committees-card.component';

describe('CommitteesCardComponent', () => {
  let component: CommitteesCardComponent;
  let fixture: ComponentFixture<CommitteesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
