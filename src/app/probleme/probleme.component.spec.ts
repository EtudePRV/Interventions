import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule} from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 2 caractères',() => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['minLength']).toBeFalsy();
  });
  it('Zone PRÉNOM valide avec 3 caractères',() => {
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });
  it('Zone PRÉNOM valide avec 200 caractères',() => {
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });
  it('Zone PRÉNOM invalide avec aucune valeur',() => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
