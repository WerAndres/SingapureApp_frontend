import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPadresComponent } from './add-padres.component';

describe('AddPadresComponent', () => {
  let component: AddPadresComponent;
  let fixture: ComponentFixture<AddPadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
