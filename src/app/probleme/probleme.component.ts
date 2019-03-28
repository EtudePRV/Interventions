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
       listTypeProbleme : [ '',[Validators.required]]

     });
     
     this.types.obtenirTypes()
    .subscribe(cat => this.typeProbleme = cat,
             error => this.errorMessage = <any>error);
  }
    


}
