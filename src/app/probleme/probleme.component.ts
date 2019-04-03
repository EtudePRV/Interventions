import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

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
          }),
      telephone: [{value:'', disabled:true}],
     });
     
     this.types.obtenirTypes()
    .subscribe(cat => this.typeProbleme = cat,
             error => this.errorMessage = <any>error);
  }
  appliquerNotifications(Contact:string):void{
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmControl = this.problemeForm.get('courrielGroup.courrielConfirmation');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmControl.clearValidators();
    courrielConfirmControl.reset();
    courrielConfirmControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (Contact === 'Telephone'){
      courrielControl.disable();
      courrielConfirmControl.disable();

      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();

    } else  if (Contact === 'Courriels'){
      telephoneControl.disable()
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();
      courrielConfirmControl.setValidators([Validators.required]);
      courrielConfirmControl.enable();

    } 
  }
}
