import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('cevap listesi görünür olmalı', () => {
  cy.get('[data-cy="response-list"]').should('be.visible');
});
