/// <reference types="cypress" />

// Credit Transactions API list
describe('Credit Transactions (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || Cypress.config('baseUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/credit_transactions returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/credit_transactions`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Credit Transactions (UI)', () => {
  it('Credit Transactions page renders and list is visible', () => {
    cy.visit('/credit-transactions')
    cy.get('[data-cy="credit-transaction-list"]').should('be.visible')
  })
})
