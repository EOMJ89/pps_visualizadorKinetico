import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LindasPage } from './lindas.page';

describe('LindasPage', () => {
  let component: LindasPage;
  let fixture: ComponentFixture<LindasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LindasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
