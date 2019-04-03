import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import {TypeProblemeService} from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,HttpClientModule,],
      declarations: [ ProblemeComponent ],
      providers:[TypeProblemeService]
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

  it('Zone TELEPHONE est désactivée quand ne pas me notifier ',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier ',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('telephone');
    expect(zone).toBeNull;
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier ',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });
});
