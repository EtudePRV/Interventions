import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('Inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomProblemeId')).sendKeys('Joe');
    element(by.id('nomProblemeId')).sendKeys('Gage');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('listTypeProblemeId')).all(by.tagName('option')).get(1).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('ContactId')).get(0).click();   
    element(by.id('noUniteId')).sendKeys('1');
    element(by.id('descriptionProblemeId')).sendKeys('Maiders');   
  }

  setChampsValidesScenarioAlternatifParMessageTexte(): void {
    element(by.id('prenomProblemeId')).sendKeys('Joe');
    element(by.id('nomProblemeId')).sendKeys('Gage');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('listTypeProblemeId')).all(by.tagName('option')).get(1).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('ContactId')).get(2).click();   
    element(by.id('noUniteId')).sendKeys('1');
    element(by.id('telephoneId')).sendKeys('1514123123');
    element(by.id('descriptionProblemeId')).sendKeys('Maiders');
    
  }

  setChampsValidesScenarioAlternatifParCourriel(): void {
    element(by.id('prenomProblemeId')).sendKeys('Joe');
    element(by.id('nomProblemeId')).sendKeys('Gage');    
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('listTypeProblemeId')).all(by.tagName('option')).get(1).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('ContactId')).get(1).click(); 
    element(by.id('courrielId')).sendKeys('joe@gage.com');  
    element(by.id('courrielConfirmationId')).sendKeys('joe@gage.com');  
    element(by.id('noUniteId')).sendKeys('1');
    element(by.id('descriptionProblemeId')).sendKeys('Maiders');
    
  }
  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }   

  setZoneDescriptionCaracteresSuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }

  setZoneDescriptionCaracteresInsuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXX');
  }

  obtenirClasseZoneDescription()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }   
}
