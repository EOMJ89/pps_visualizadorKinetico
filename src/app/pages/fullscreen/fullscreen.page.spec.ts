import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenPage } from './fullscreen.page';

describe('FullscreenPage', () => {
  let component: FullscreenPage;
  let fixture: ComponentFixture<FullscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
