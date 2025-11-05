// cypress/support/e2e.js

// Import commands
import './commands'

// Mochawesome reporter
import 'cypress-mochawesome-reporter/register'

// Global beforeEach
beforeEach(() => {
  // API intercepts'i her testte ayarla
  setupAPIIntercepts()
})

// API Intercepts fonksiyonu
function setupAPIIntercepts() {
  const apiUrl = Cypress.env('apiUrl')
  const apiVersion = Cypress.env('apiVersion')
  
  // Users
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/users`).as('getUsers')
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/users/*`).as('getUser')
  cy.intercept('POST', `${apiUrl}/api/${apiVersion}/users`).as('createUser')
  cy.intercept('PUT', `${apiUrl}/api/${apiVersion}/users/*`).as('updateUser')
  cy.intercept('DELETE', `${apiUrl}/api/${apiVersion}/users/*`).as('deleteUser')
  
  // Projects
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/projects`).as('getProjects')
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/projects/*`).as('getProject')
  cy.intercept('POST', `${apiUrl}/api/${apiVersion}/projects`).as('createProject')
  cy.intercept('PUT', `${apiUrl}/api/${apiVersion}/projects/*`).as('updateProject')
  cy.intercept('DELETE', `${apiUrl}/api/${apiVersion}/projects/*`).as('deleteProject')
  
  // Scales
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/scales`).as('getScales')
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/scales/*`).as('getScale')
  cy.intercept('POST', `${apiUrl}/api/${apiVersion}/scales`).as('createScale')
  cy.intercept('PUT', `${apiUrl}/api/${apiVersion}/scales/*`).as('updateScale')
  cy.intercept('DELETE', `${apiUrl}/api/${apiVersion}/scales/*`).as('deleteScale')

  // Scale Items
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/scale_items`).as('getScaleItems')
  cy.intercept('POST', `${apiUrl}/api/${apiVersion}/scale_items`).as('createScaleItem')
  cy.intercept('DELETE', `${apiUrl}/api/${apiVersion}/scale_items/*`).as('deleteScaleItem')

  // Surveys
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/surveys`).as('getSurveys')
  cy.intercept('GET', `${apiUrl}/api/${apiVersion}/surveys/*`).as('getSurvey')
  cy.intercept('POST', `${apiUrl}/api/${apiVersion}/surveys`).as('createSurvey')
  cy.intercept('PUT', `${apiUrl}/api/${apiVersion}/surveys/*`).as('updateSurvey')
  cy.intercept('DELETE', `${apiUrl}/api/${apiVersion}/surveys/*`).as('deleteSurvey')
}

// Global error handler
Cypress.on('uncaught:exception', (err, runnable) => {
  // Frontend hatalarını ignore et (test sırasında)
  console.log('Caught exception:', err.message)
  return false
})