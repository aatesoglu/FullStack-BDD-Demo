/// <reference types="cypress" />

// Responses API list
describe('Responses (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || Cypress.config('baseUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/responses returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/responses`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Responses (UI)', () => {
  it('Responses page renders and list is visible', () => {
    cy.visit('/responses')
    cy.get('[data-cy="response-list"]').should('be.visible')
  })
})
