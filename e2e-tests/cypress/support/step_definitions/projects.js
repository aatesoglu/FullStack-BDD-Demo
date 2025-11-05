import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl');
const API_URL = Cypress.env('apiUrl');

// ============ PROJE YÖNETİMİ STEP DEFINITIONS ============



When('proje formunu doldurur', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    const field = row.Alan;
    const value = row.Değer;
    
    if (field === 'İsim' || field === 'Title') {
      cy.get('[data-cy="project-title-input"]')
        .should('be.visible')
        .clear()
        .type(value);
    } else if (field === 'Açıklama' || field === 'Description') {
      cy.get('[data-cy="project-description-input"]')
        .should('be.visible')
        .clear()
        .type(value);
    }
  });
});

Given('kullanıcı "Yeni Proje" sayfasında', () => {
  cy.visit(`${FRONTEND_URL}/projects/new`);
  cy.wait(1000);
  cy.get('[data-cy="project-title-input"]').should('be.visible');
});

// Button click is now in common_steps.js

Then('proje listesi görünür olmalı', () => {
  cy.wait(1000);
  cy.get('[data-cy="project-list"]')
    .should('be.visible')
    .should('exist');
});

Given('sistemde {string} projesi var', (title) => {
  // First ensure a user exists
  cy.apiRequest('GET', '/users', null).then((usersResponse) => {
    let userId;
    if (Array.isArray(usersResponse.body) && usersResponse.body.length > 0) {
      userId = usersResponse.body[0].id;
    } else {
      cy.createUser('Test User', 'test@example.com').then((user) => {
        userId = user.id || user.body?.id || usersResponse.body[0]?.id;
        
        cy.getProjectByTitle(title).then((project) => {
          if (!project) {
            cy.createProject(title, 'Test project description', userId);
          }
        });
      });
    }
    
    if (userId) {
      cy.getProjectByTitle(title).then((project) => {
        if (!project) {
          cy.createProject(title, 'Test project description', userId);
        }
      });
    }
  });
});

When('proje düzenleme sayfasına gider', () => {
  // Navigate to projects page first if not already there
  cy.url().then((url) => {
    if (!url.includes('/projects')) {
      cy.visit(`${FRONTEND_URL}/projects`);
    }
  });
  // Find and click the edit button for the first project
  cy.get('[data-cy="project-list-item"] a[href*="/edit"], .project-list-item a[href*="/edit"]')
    .first()
    .click({ force: true });
});

When('proje ismini {string} olarak değiştirir', (newTitle) => {
  cy.url().then((url) => {
    if (!url.includes('/edit')) {
      cy.visit(`${FRONTEND_URL}/projects`);
      cy.get('[data-cy="project-list-item"] a[href*="/edit"]').first().click({ force: true });
    }
  });
  cy.get('[data-cy="project-title-input"], input[name="title"], #title')
    .clear()
    .type(newTitle);
});

When('proje için sil butonuna tıklar', () => {
  // Ensure we're on the projects page
  cy.url().then((url) => {
    if (!url.includes('/projects')) {
      cy.visit(`${FRONTEND_URL}/projects`);
      cy.wait(1000); // Wait for page to load
    }
  });
  // Find the delete button for any project (first one)
  cy.get('[data-cy="delete-project"], button:contains("Sil"), button[aria-label*="delete"]')
    .first()
    .click({ force: true });
});

Given('sistemde projeler var', () => {
  cy.apiRequest('GET', '/users').then((usersResponse) => {
    let userId;
    if (Array.isArray(usersResponse.body) && usersResponse.body.length > 0) {
      userId = usersResponse.body[0].id;
    } else {
      cy.createUser('Test User', 'test@example.com').then((user) => {
        userId = user.id || user.body?.id;
      });
    }
    
    cy.apiRequest('GET', '/projects', null).then((projectsResponse) => {
      if (!Array.isArray(projectsResponse.body) || projectsResponse.body.length === 0) {
        cy.createProject('Test Project', 'Test description', userId);
      }
    });
  });
  cy.visit(`${FRONTEND_URL}/projects`);
});

// When('bir projeye tıklar', () => {
//   cy.get('[data-cy="project-list-item"], .project-list-item, li').first().click();
// });

// Then('proje detay sayfası açılmalı', () => {
//   cy.url().should('match', /\/projects\/\d+/);
//   cy.get('[data-cy="project-detail"], .project-detail').should('be.visible');
// });

// Then('proje bilgileri görünür olmalı', () => {
//   cy.get('[data-cy="project-title"], .project-title').should('be.visible');
//   cy.get('[data-cy="project-description"], .project-description').should('be.visible');
// });

// Then('projeye ait scale\'ler listelenmeli', () => {
//   // This step might need adjustment based on actual implementation
//   cy.get('[data-cy="project-scales"], .project-scales').should('exist');
// });

// // Başarı mesajı artık common_steps.js'de

// Then('proje listesinde {string} olmalı', (title) => {
//   cy.wait(1000);
//   cy.visit(`${FRONTEND_URL}/projects`);
//   cy.wait(1000);
//   cy.get('[data-cy="project-list"]')
//     .should('contain', title);
// });

// Then('proje listesinde {string} olmamalı', (title) => {
//   cy.wait(1000);
//   cy.visit(`${FRONTEND_URL}/projects`);
//   cy.wait(1000);
//   cy.get('[data-cy="project-list"]')
//     .should('not.contain', title);
// });

