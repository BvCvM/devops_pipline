import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProf } from './modif-prof';

describe('ModifProf', () => {
  let component: ModifProf;
  let fixture: ComponentFixture<ModifProf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifProf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifProf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
