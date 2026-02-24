import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpProfesseur } from './sign-up-professeur';

describe('SignUpProfesseur', () => {
  let component: SignUpProfesseur;
  let fixture: ComponentFixture<SignUpProfesseur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpProfesseur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpProfesseur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
