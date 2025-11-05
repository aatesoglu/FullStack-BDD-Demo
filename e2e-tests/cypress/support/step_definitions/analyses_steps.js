import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('analiz listesi görünür olmalı', () => {
  cy.get('[data-cy="analysis-list"]').should('be.visible');
});
