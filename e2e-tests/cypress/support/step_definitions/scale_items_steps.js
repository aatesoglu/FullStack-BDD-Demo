import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl');

Then('ölçek maddeleri listesi görünür olmalı', () => {
  cy.get('[data-cy="scale-item-list"]').should('be.visible');
});

When('yeni ölçek maddesi butonuna tıklar', () => {
  cy.get('[data-cy="new-scale-item-btn"]').should('be.visible').click({ force: true });
});

When('ölçek maddesi formunu {string} içeriği ile doldurur', (content) => {
  cy.get('input[name="content"], #content').should('be.visible').clear().type(content);
  // Optional defaults
  cy.get('select[name="item_type"], #item_type').select('likert', { force: true });
  cy.get('input[name="order"], #order').clear().type('1');
});

When('ölçek maddesi oluştur butonuna tıklar', () => {
  cy.get('button[type="submit"], button:contains("Create")').first().click({ force: true });
});

Then('ölçek maddeleri listesinde {string} görünmeli', (text) => {
  cy.visit(`${FRONTEND_URL}/scale-items`);
  cy.get('[data-cy="scale-item-list"]').should('contain', text);
});
