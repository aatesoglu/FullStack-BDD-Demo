/// <reference types="cypress" />

describe('Projects (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || Cypress.config('baseUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/projects returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/projects`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Projects (UI)', () => {
  it('Projects page renders and list is visible', () => {
    cy.visit('/projects')
    cy.get('[data-cy="project-list"]').should('be.visible')
  })
})
