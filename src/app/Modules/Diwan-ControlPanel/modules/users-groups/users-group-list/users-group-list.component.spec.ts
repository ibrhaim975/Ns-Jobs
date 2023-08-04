import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGroupListComponent } from './users-group-list.component';

describe('UsersGroupListComponent', () => {
  let component: UsersGroupListComponent;
  let fixture: ComponentFixture<UsersGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
