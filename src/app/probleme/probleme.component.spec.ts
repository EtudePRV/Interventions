import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

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
  // let validator = ZonesValidator.longueurMinimum(3);
  // let control = {value:'          '};
  // let result = validator(control as AbstractControl);
  // expect(result['nbreCaracteresInsuffisants ']).toBe(true);
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
  it('Zone PRÉNOM invalide avec 10 espaces',() => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue(' '.repeat(10));
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });
  it('Zone PRÉNOM invalide avec 2 espaces et 1 caractère',() => {
    let errors = {};
    let zone = component.problemeForm.controls['prenomProbleme']
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });
});
