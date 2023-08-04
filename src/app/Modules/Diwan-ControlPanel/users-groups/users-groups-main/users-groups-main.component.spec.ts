import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGroupsMainComponent } from './users-groups-main.component';

describe('UsersGroupsMainComponent', () => {
  let component: UsersGroupsMainComponent;
  let fixture: ComponentFixture<UsersGroupsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersGroupsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
