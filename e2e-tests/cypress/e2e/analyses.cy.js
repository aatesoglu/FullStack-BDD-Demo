/// <reference types="cypress" />

// Analyses API list
describe('Analyses (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/analyses returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/analyses`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Analyses (UI)', () => {
  it('Analyses page renders and list is visible', () => {
    cy.visit('/analyses')
    cy.get('[data-cy="analysis-list"]').should('be.visible')
  })
})
