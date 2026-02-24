import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEleve } from './modif-eleve';

describe('ModifEleve', () => {
  let component: ModifEleve;
  let fixture: ComponentFixture<ModifEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifEleve]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifEleve);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
