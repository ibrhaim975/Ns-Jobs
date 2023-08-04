import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowregistryComponent } from './workflowregistry.component';

describe('WorkflowregistryComponent', () => {
  let component: WorkflowregistryComponent;
  let fixture: ComponentFixture<WorkflowregistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowregistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowregistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
