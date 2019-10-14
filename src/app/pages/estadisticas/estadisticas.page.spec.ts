import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPage } from './estadisticas.page';

describe('EstadisticasPage', () => {
  let component: EstadisticasPage;
  let fixture: ComponentFixture<EstadisticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
