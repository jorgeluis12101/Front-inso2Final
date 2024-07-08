import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrardeuda3Component } from './registrardeuda3.component';

describe('Registrardeuda3Component', () => {
  let component: Registrardeuda3Component;
  let fixture: ComponentFixture<Registrardeuda3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Registrardeuda3Component]
    });
    fixture = TestBed.createComponent(Registrardeuda3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
