/// <reference types="cypress" />

describe('Scales (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || Cypress.config('baseUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/scales returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/scales`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Scales (UI)', () => {
  it('Scales page renders and list is visible', () => {
    cy.visit('/scales')
    cy.get('[data-cy="scale-list"]').should('be.visible')
  })
})
