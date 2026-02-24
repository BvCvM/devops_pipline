import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfesseur } from './gestion-professeur';

describe('GestionProfesseur', () => {
  let component: GestionProfesseur;
  let fixture: ComponentFixture<GestionProfesseur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProfesseur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProfesseur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
