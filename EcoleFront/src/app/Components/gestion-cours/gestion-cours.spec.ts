import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCours } from './gestion-cours';

describe('GestionCours', () => {
  let component: GestionCours;
  let fixture: ComponentFixture<GestionCours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
