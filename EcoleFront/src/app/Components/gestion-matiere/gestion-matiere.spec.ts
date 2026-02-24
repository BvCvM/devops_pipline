import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMatiere } from './gestion-matiere';

describe('GestionMatiere', () => {
  let component: GestionMatiere;
  let fixture: ComponentFixture<GestionMatiere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMatiere]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMatiere);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
