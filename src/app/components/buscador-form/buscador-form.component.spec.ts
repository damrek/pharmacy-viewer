import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFormComponent } from './buscador-form.component';

describe('BuscadorFormComponent', () => {
  let component: BuscadorFormComponent;
  let fixture: ComponentFixture<BuscadorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
