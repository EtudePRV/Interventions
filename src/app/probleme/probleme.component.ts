import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm : FormGroup;
  typeProbleme : ITypeProbleme[];
  errorMessage: String;
  constructor(private fb: FormBuilder,private types: TypeProblemeService) { }

  ngOnInit() {
     this.problemeForm = this.fb.group({
       prenomProbleme : ['', [ZonesValidator.longueurMinimum(3),Validators.required]],
       nomProbleme : ['', [Validators.maxLength(50),Validators.required]],
       listTypeProbleme : [ '',[Validators.required]],
       Contact:['Courriels'],
       courrielGroup:this.fb.group({ 
          courriel: [{value:'', disabled:true}],
          courrielConfirmation: [{value:'', disabled:true}],
          },{validator: emailMatcherValidator.courrielDifferents()}),
      telephone: [{value:'', disabled:true}],
     });
     
     this.types.obtenirTypes()
    .subscribe(cat => this.typeProbleme = cat,
             error => this.errorMessage = <any>error);

      this.problemeForm.get('Contact').valueChanges
      .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(Contact:string):void{
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroups = this.problemeForm.get('courrielGroup');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();
    courrielConfirmControl.clearValidators();
    courrielConfirmControl.reset();
    courrielConfirmControl.disable();
    courrielGroups.clearValidators();
    courrielGroups.reset();
    courrielGroups.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (Contact === 'Telephone'){
      courrielControl.disable();
      courrielConfirmControl.disable();

      telephoneControl.setValidators([Validators.required,Validators.pattern('[0-9]+'),Validators.minLength(10), Validators.maxLength(10)]);
      telephoneControl.enable();

    } else  if (Contact === 'Courriels'){
      telephoneControl.disable();
      courrielControl.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmControl.setValidators([Validators.required]);
      courrielConfirmControl.enable();
      courrielGroups.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
    }  else if (Contact === 'Inconnu'){
      courrielControl.disable();
      courrielConfirmControl.disable();
      telephoneControl.disable();
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmControl.updateValueAndValidity();
    courrielGroups.updateValueAndValidity();
  }
}
