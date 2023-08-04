import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesAddEditComponent } from './committees-add-edit.component';

describe('CommitteesAddEditComponent', () => {
  let component: CommitteesAddEditComponent;
  let fixture: ComponentFixture<CommitteesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
