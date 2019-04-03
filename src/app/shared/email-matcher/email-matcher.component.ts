import { AbstractControl, ValidatorFn } from'@angular/forms';
export class emailMatcherValidator { 
    static courrielDifferents(): ValidatorFn {
         return (c: AbstractControl): { [key: string]: boolean } | null=> { 
             if (!c['controls'].courrielControl.value || !c['controls'].courrielConfirmControl.value) {
                  return null;             
                } 
                return c['controls'].courrielControl.value === 
                c['controls'].courrielConfirmControl.value ? null : { match: true };        
             };     
        }   
    }