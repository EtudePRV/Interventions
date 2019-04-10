import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('stocks App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('Doit activer le bouton Sauvegarderavec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });  
  
  it('Doit activer le bouton Sauvegarder avec champs valides scénario alternatifPar message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Doit activer le bouton Sauvegarderavec champs valides scénario alternatif Par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure VERTE si nombre de caractères suffisant', () => {
    page.setZoneDescriptionCaracteresSuffisant();  
    expect(page.obtenirClasseZoneDescription()).toContain('is-valid');
  });

  it('Zone DESCRIPTION DU PROBLÈME a une bordure ROUGE si nombre de caractères insuffisant ', () => {
    page.setZoneDescriptionCaracteresInsuffisant();  
    expect(page.obtenirClasseZoneDescription()).toContain('is-invalid');
  });
});
