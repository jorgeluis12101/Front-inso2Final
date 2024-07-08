import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrardeuda4Component } from './registrardeuda4.component';

describe('Registrardeuda4Component', () => {
  let component: Registrardeuda4Component;
  let fixture: ComponentFixture<Registrardeuda4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Registrardeuda4Component]
    });
    fixture = TestBed.createComponent(Registrardeuda4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
