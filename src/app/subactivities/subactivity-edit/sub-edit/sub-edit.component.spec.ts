import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEditComponent } from './sub-edit.component';

describe('SubEditComponent', () => {
  let component: SubEditComponent;
  let fixture: ComponentFixture<SubEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
