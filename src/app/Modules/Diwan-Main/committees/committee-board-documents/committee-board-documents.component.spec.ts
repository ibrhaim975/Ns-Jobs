import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeBoardDocumentsComponent } from './committee-board-documents.component';

describe('CommitteeBoardDocumentsComponent', () => {
  let component: CommitteeBoardDocumentsComponent;
  let fixture: ComponentFixture<CommitteeBoardDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteeBoardDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeBoardDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
