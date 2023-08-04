import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceMainComponent } from './my-space-main.component';

describe('MySpaceMainComponent', () => {
  let component: MySpaceMainComponent;
  let fixture: ComponentFixture<MySpaceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpaceMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySpaceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
