/// <reference types="cypress" />

describe('Kullanıcı Yönetimi (API)', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3000'
  const apiVersion = Cypress.env('apiVersion') || 'v1'

  const makeEmail = (name) => `${name.toLowerCase().replace(/\s+/g, '')}-${Date.now()}@example.com`

  it('GET /api/v1/users returns 200', () => {
    cy.request({ url: `${apiUrl}/api/${apiVersion}/users`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.exist
    })
  })

  it('Can create and fetch a user via API', () => {
    const name = 'John Doe'
    const email = makeEmail(name)

    cy.request({
      method: 'POST',
      url: `${apiUrl}/api/${apiVersion}/users`,
      body: { user: { name, email, password: 'password123' } },
      failOnStatusCode: false,
    }).then((createRes) => {
      expect(createRes.status).to.eq(201)
      const id = createRes.body.id

      cy.request({ url: `${apiUrl}/api/${apiVersion}/users/${id}`, failOnStatusCode: false }).then((showRes) => {
        expect(showRes.status).to.eq(200)
        expect(showRes.body.email).to.eq(email)
      })
    })
  })
})

describe('Kullanıcı Yönetimi (UI)', () => {
  const makeEmailUI = (name) => `${name.toLowerCase().replace(/\s+/g, '')}+${Date.now()}@example.com`

  it('Kullanıcı listesi görüntülenir', () => {
    cy.visit('/users')
    cy.get('[data-cy="user-list"]').should('be.visible')
  })

  it('Yeni kullanıcı oluşturur ve listede görünür', () => {
    const name = 'Jane Doe'
    const email = makeEmailUI(name)

    cy.visit('/users')
    cy.contains('a, button', 'New User', { matchCase: false }).click()

    cy.get('[data-cy="user-name-input"]').clear().type(name)
    cy.get('[data-cy="user-email-input"]').clear().type(email)
    cy.get('[data-cy="user-password-input"]').clear().type('password123')

    // Click save and wait for redirect back to list, then assert item appears
    cy.contains('button', 'Save', { matchCase: false }).click()

    cy.url({ timeout: 20000 }).should('include', '/users')
    cy.get('[data-cy="user-list"]', { timeout: 20000 })
      .should('be.visible')
      .should('contain', name)
  })

  it('Kullanıcı detaylarını görüntüler', () => {
    cy.visit('/users')
    cy.get('[data-cy="user-list"]').find('li, [data-cy="user-list-item"]').first().find('a').first().click({ force: true })
    cy.url().should('match', /\/users\/.+/)
    cy.get('[data-cy="user-name"], .user-name').should('be.visible')
    cy.get('[data-cy="user-email"], .user-email').should('be.visible')
  })
})
