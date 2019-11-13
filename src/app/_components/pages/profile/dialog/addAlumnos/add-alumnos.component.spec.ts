import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnosComponent } from './add-alumnos.component';

describe('AddAlumnosComponent', () => {
  let component: AddAlumnosComponent;
  let fixture: ComponentFixture<AddAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
