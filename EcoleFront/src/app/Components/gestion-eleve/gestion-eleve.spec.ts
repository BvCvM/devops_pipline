import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEleve } from './gestion-eleve';

describe('GestionEleve', () => {
  let component: GestionEleve;
  let fixture: ComponentFixture<GestionEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEleve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEleve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
