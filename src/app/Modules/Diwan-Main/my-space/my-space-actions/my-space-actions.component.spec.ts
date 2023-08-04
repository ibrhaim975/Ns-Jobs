import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceActionsComponent } from './my-space-actions.component';

describe('MySpaceActionsComponent', () => {
  let component: MySpaceActionsComponent;
  let fixture: ComponentFixture<MySpaceActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpaceActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpaceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
