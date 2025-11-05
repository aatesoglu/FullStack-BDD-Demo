import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('kredi işlemleri listesi görünür olmalı', () => {
  cy.get('[data-cy="credit-transaction-list"]').should('be.visible');
});
