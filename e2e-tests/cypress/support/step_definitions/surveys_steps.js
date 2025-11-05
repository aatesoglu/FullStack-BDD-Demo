import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl');

Then('anket listesi görünür olmalı', () => {
  cy.get('[data-cy="survey-list"]').should('be.visible');
});

When('yeni anket butonuna tıklar', () => {
  cy.get('[data-cy="new-survey-btn"]').should('be.visible').click({ force: true });
});

When('anket formunu {string} başlığı ile doldurur', (title) => {
  cy.get('input[name="title"], #title').should('be.visible').clear().type(title);
});

When('anket oluştur butonuna tıklar', () => {
  cy.get('button[type="submit"], button:contains("Create")').first().click({ force: true });
});

Then('anket listesinde {string} görünmeli', (title) => {
  cy.visit(`${FRONTEND_URL}/surveys`);
  cy.get('[data-cy="survey-list"]').should('contain', title);
});
