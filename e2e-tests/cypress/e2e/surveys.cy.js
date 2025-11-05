/// <reference types="cypress" />

describe('Surveys (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  it('GET /api/v1/surveys returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/surveys`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })
})

describe('Surveys (UI)', () => {
  it('Surveys page renders and list is visible', () => {
    cy.visit('/surveys')
    cy.get('[data-cy="survey-list"]').should('be.visible')
  })
})
