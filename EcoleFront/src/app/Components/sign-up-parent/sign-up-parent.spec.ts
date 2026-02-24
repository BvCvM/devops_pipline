import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpParent } from './sign-up-parent';

describe('SignUpParent', () => {
  let component: SignUpParent;
  let fixture: ComponentFixture<SignUpParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
