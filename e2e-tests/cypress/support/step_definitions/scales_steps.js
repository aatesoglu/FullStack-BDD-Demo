import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl');

Then('ölçek listesi görünür olmalı', () => {
  cy.get('[data-cy="scale-list"]').should('be.visible');
});

When('yeni ölçek butonuna tıklar', () => {
  cy.get('[data-cy="new-scale-btn"]').should('be.visible').click({ force: true });
});

When('ölçek formunu {string} ismi ile doldurur', (name) => {
  cy.get('input[name="title"], #title').should('be.visible').clear().type(name);
});

When('ölçek oluştur butonuna tıklar', () => {
  cy.get('button[type="submit"], button:contains("Create")').first().click({ force: true });
});

Then('ölçek listesinde {string} görünmeli', (title) => {
  cy.visit(`${FRONTEND_URL}/scales`);
  cy.get('[data-cy="scale-list"]').should('contain', title);
});
