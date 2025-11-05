/// <reference types="cypress" />

describe('Scale Items (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || Cypress.config('baseUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/scale_items returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/scale_items`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Scale Items (UI)', () => {
  it('Scale Items page renders and list is visible', () => {
    cy.visit('/scale-items')
    cy.get('[data-cy="scale-item-list"]').should('be.visible')
  })
})
