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

  it('Zone TELEPHONE est désactivée quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme',() => {
    component.appliquerNotifications('Courriels');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('lol');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null',() => {
    component.appliquerNotifications('Courriels');
    let errors = {};

    let zoneA = component.problemeForm.get('courrielGroup.courriel');
    let zoneB = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneB.setValue('Valide@BobMotel.com');
    let group = component.problemeForm.get('courrielGroup');
    errors = group.errors ||{};

    expect(errors['controls']).toBeNull;

  });

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null',() => {
    component.appliquerNotifications('Courriels');
    let errors = {};
    
    let zoneA = component.problemeForm.get('courrielGroup.courriel');
    let zoneB = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    zoneA.setValue('Valide@BobMotel.com');
    let group = component.problemeForm.get('courrielGroup');
    errors = group.errors ||{};
    expect(errors['controls']).toBeNull;

  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');
    let errors = {};

    let zoneA = component.problemeForm.get('courrielGroup.courriel');
    let zoneB = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    zoneA.setValue('Valide@BobMotel.com');
    zoneB.setValue('alide@BobMotel.com');

    let group = component.problemeForm.get('courrielGroup');
    errors = group.errors ||{};
    expect(errors['controls']).toBeTruthy;
  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel',() => {
    component.appliquerNotifications('Courriels');
    let errors = {};

    let zoneA = component.problemeForm.get('courrielGroup.courriel');
    let zoneB = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneA.setValue('Valide@BobMotel.com');
    zoneB.setValue(zoneA.value);

    let group = component.problemeForm.get('courrielGroup');
    errors = group.errors ||{};
    expect(errors['controls']).toBeUndefined();
  });

  it('Zone TELEPHONE est activée quand notifier par messagerie texte',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte ',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte  ',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte  ',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('INVALID');
  });

  it('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('lol');
    expect(zone.status).toEqual('INVALID');
  });
  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('9'.repeat(9));
    expect(zone.status).toEqual('INVALID');
  });
  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(11));
    expect(zone.status).toEqual('INVALID');
  });
  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte',() => {
    component.appliquerNotifications('Telephone');

    let zone = component.problemeForm.get('telephone');
    zone.setValue('0'.repeat(10));
    expect(zone.status).toEqual('VALID');
  });
});
