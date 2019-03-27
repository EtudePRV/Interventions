import { ValidatorFn, AbstractControl } from "@angular/forms";

export class ZonesValidator{
    static longueurMinimum( longueur:number): ValidatorFn {
        return(valeurControle :AbstractControl):{[key: string]:boolean}| null =>{
             let valeur = valeurControle.value.trim();
            if(valeur.length >= longueur ){
                return null;
            } else if(valeur == null){
               return {'nbreCaracteresInsuffisants':true}; 
            }
            return {'nbreCaracteresInsuffisants':true};
        };
    }
}