import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrardeuda2Component } from './registrardeuda2.component';

describe('Registrardeuda2Component', () => {
  let component: Registrardeuda2Component;
  let fixture: ComponentFixture<Registrardeuda2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Registrardeuda2Component]
    });
    fixture = TestBed.createComponent(Registrardeuda2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
