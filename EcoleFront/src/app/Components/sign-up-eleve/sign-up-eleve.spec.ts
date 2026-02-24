import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEleve } from './sign-up-eleve';

describe('SignUpEleve', () => {
  let component: SignUpEleve;
  let fixture: ComponentFixture<SignUpEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpEleve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpEleve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
