// cypress/support/commands.js

const API_URL = Cypress.env('apiUrl') || 'http://localhost:3000'
const API_VERSION = Cypress.env('apiVersion') || 'v1'

// Helpers to normalize arguments
function normalizeUserArgs(arg1, arg2, arg3) {
  if (typeof arg1 === 'object' && arg1 !== null) {
    return arg1
  }
  // Treat as (name, email, password)
  return { name: arg1, email: arg2, password: arg3 || 'password123' }
}

function normalizeProjectArgs(arg1, arg2, arg3) {
  if (typeof arg1 === 'object' && arg1 !== null) {
    return arg1
  }
  // Treat as (title, description, user_id)
  return { title: arg1, description: arg2, user_id: arg3 }
}

// ============ USER COMMANDS ============
Cypress.Commands.add('createUser', (arg1, arg2, arg3) => {
  const userData = normalizeUserArgs(arg1, arg2, arg3)
  return cy.request({
    method: 'POST',
    url: `${API_URL}/api/${API_VERSION}/users`,
    body: { user: userData },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201) {
      return response.body
    }
  })
})

Cypress.Commands.add('getUsers', () => {
  return cy.request(`${API_URL}/api/${API_VERSION}/users`)
})

Cypress.Commands.add('deleteUser', (userId) => {
  return cy.request({
    method: 'DELETE',
    url: `${API_URL}/api/${API_VERSION}/users/${userId}`,
    failOnStatusCode: false
  })
})

// ============ PROJECT COMMANDS ============
Cypress.Commands.add('createProject', (arg1, arg2, arg3) => {
  const projectData = normalizeProjectArgs(arg1, arg2, arg3)
  return cy.request({
    method: 'POST',
    url: `${API_URL}/api/${API_VERSION}/projects`,
    body: { project: projectData },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201) {
      return response.body
    }
  })
})

// Fetch a project by title via API
Cypress.Commands.add('getProjectByTitle', (title) => {
  return cy.request({
    method: 'GET',
    url: `${API_URL}/api/${API_VERSION}/projects`,
    failOnStatusCode: false,
  }).then((response) => {
    if (Array.isArray(response.body)) {
      const found = response.body.find((p) => (p.title || '').toLowerCase() === String(title).toLowerCase())
      return found || null
    }
    return null
  })
})

// ============ HELPER COMMANDS ============
Cypress.Commands.add('setupAPIIntercepts', () => {
  // Bu fonksiyon e2e.js'de çağrılıyor
  cy.log('API intercepts ayarlandı')
})

// Genel amaçlı API isteği (step'lerde kullanılıyor: cy.apiRequest(method, path, body))
Cypress.Commands.add('apiRequest', (method, path, body) => {
  const url = `${API_URL}/api/${API_VERSION}${path.startsWith('/') ? path : `/${path}`}`
  return cy.request({
    method,
    url,
    body,
    failOnStatusCode: false,
  })
})