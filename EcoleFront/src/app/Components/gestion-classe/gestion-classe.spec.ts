import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClasse } from './gestion-classe';

describe('GestionClasse', () => {
  let component: GestionClasse;
  let fixture: ComponentFixture<GestionClasse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionClasse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionClasse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
