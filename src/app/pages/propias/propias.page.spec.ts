import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiasPage } from './propias.page';

describe('PropiasPage', () => {
  let component: PropiasPage;
  let fixture: ComponentFixture<PropiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
