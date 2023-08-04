import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAttributesComponent } from './tasks-attributes.component';

describe('TasksAttributesComponent', () => {
  let component: TasksAttributesComponent;
  let fixture: ComponentFixture<TasksAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
