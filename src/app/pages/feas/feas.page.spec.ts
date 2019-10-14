import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasPage } from './feas.page';

describe('FeasPage', () => {
  let component: FeasPage;
  let fixture: ComponentFixture<FeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
