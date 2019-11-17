import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicManagementComponent } from './academicManagement.component';

describe('AcademicManagementComponent', () => {
  let component: AcademicManagementComponent;
  let fixture: ComponentFixture<AcademicManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
