import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl');
const API_URL = Cypress.env('apiUrl');

// ============ KULLANICI YÖNETİMİ STEP DEFINITIONS ============

Given('kullanıcı "Yeni Kullanıcı" sayfasında', () => {
  cy.visit(`${FRONTEND_URL}/users/new`);
  cy.wait(1000); // Sayfa yüklenmesi için bekle
  cy.get('[data-cy="user-name-input"]').should('be.visible');
});

When('kullanıcı formunu doldurur', (dataTable) => {
  // Tablo iki sütunlu verilmişse (| Alan | Değer |) rowsHash ile al
  const map = typeof dataTable.rowsHash === 'function' ? dataTable.rowsHash() : null;
  if (map && Object.keys(map).length > 0) {
    Object.entries(map).forEach(([field, value]) => {
      if (field === 'Ad' || field === 'Name') {
        cy.get('[data-cy="user-name-input"]').should('be.visible').clear().type(value);
      } else if (field === 'Email') {
        const unique = (() => {
          if (typeof value === 'string' && value.includes('@')) {
            const [local, domain] = value.split('@');
            return `${local}+${Date.now()}@${domain}`;
          }
          return `user+${Date.now()}@example.com`;
        })();
        cy.wrap(unique).as('createdEmail');
        cy.get('[data-cy="user-email-input"]').should('be.visible').clear().type(unique);
      } else if (field === 'Şifre' || field === 'Password') {
        cy.get('[data-cy="user-password-input"]').should('be.visible').clear().type(value || 'password123');
      }
    });
  } else {
    // Geriye dönük uyumluluk: başlık satırı varsa
    dataTable.hashes().forEach((row) => {
      const field = row.Alan;
      const value = row.Değer;
      if (field === 'Ad') {
        cy.get('[data-cy="user-name-input"]').should('be.visible').clear().type(value);
      } else if (field === 'Email') {
        const unique = (() => {
          if (typeof value === 'string' && value.includes('@')) {
            const [local, domain] = value.split('@');
            return `${local}+${Date.now()}@${domain}`;
          }
          return `user+${Date.now()}@example.com`;
        })();
        cy.wrap(unique).as('createdEmail');
        cy.get('[data-cy="user-email-input"]').should('be.visible').clear().type(unique);
      } else if (field === 'Şifre') {
        cy.get('[data-cy="user-password-input"]').should('be.visible').clear().type(value);
      }
    });
  }
  // Eğer tablo içinde şifre verilmediyse, varsayılan bir şifre gir
  cy.get('body').then(($body) => {
    if ($body.find('[data-cy="user-password-input"]').length) {
      const currentVal = $body.find('[data-cy="user-password-input"]').val();
      if (!currentVal) {
        cy.get('[data-cy="user-password-input"]').type('password123');
      }
    }
  });
  cy.wait(500);
});

// En az bir kullanıcı olsun (özellikle detay senaryosu için)
Given('sistemde kayıtlı kullanıcılar var', () => {
  cy.apiRequest('GET', '/users', null).then((response) => {
    if (!Array.isArray(response.body) || response.body.length === 0) {
      const name = `User ${Date.now()}`;
      const email = `user+${Date.now()}@example.com`;
      cy.createUser(name, email);
    }
  });
  cy.wait(500);
  cy.visit(`${FRONTEND_URL}/users`);
  cy.get('[data-cy="user-list"]').should('be.visible');
});

When('kullanıcı listesinden ilk kullanıcıya tıklar', () => {
  cy.get('[data-cy="user-list"]').find('li, [data-cy="user-list-item"]').first().find('a').first().click({ force: true });
});

Then('kullanıcı detay sayfası açılmalı', () => {
  cy.url().should('match', /\/users\/.+/);
  cy.get('[data-cy="user-detail"], .user-detail').should('be.visible');
});

Then('kullanıcı bilgileri görünür olmalı', (dataTable) => {
  cy.get('[data-cy="user-name"], .user-name').should('be.visible');
  cy.get('[data-cy="user-email"], .user-email').should('be.visible');
});

Then('kullanıcı listesinde {string} olmalı', (ad) => {
  // Redirect sonrası değilse güvence için /users sayfasına git
  cy.url().then((url) => {
    if (!url.includes('/users')) {
      cy.visit(`${FRONTEND_URL}/users`);
    }
  });
  cy.get('[data-cy="user-list"]', { timeout: 10000 })
    .should('be.visible')
    .should('contain', ad);
});

Then('kullanıcı listesinde {string} olmamalı', (name) => {
  cy.visit(`${FRONTEND_URL}/users`);
  cy.get('[data-cy="user-list"]')
    .should('be.visible')
    .should('not.contain', name);
});

Then('kullanıcı listesi görünür olmalı', () => {
  cy.wait(1000); // Sayfa yüklenmesi için bekle
  cy.get('[data-cy="user-list"]')
    .should('be.visible')
    .should('exist');
});

Then('API\'den kullanıcılar başarıyla yüklenmiş olmalı', () => {
  cy.apiRequest('GET', '/users', null).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});

Given('sistemde {string} kullanıcısı var', (name) => {
  const email = `${name.toLowerCase().replace(/\s+/g, '')}@test.com`;
  cy.createUser(name, email, 'test1234').then(() => {
    // Kullanıcının oluşturulduğunu doğrula
    cy.wait(500);
  });
});

When('kullanıcı {string} için düzenle butonuna tıklar', (userName) => {
  cy.wait(1000);
  cy.visit(`${FRONTEND_URL}/users`);
  cy.wait(1000);
  // Kullanıcıyı bul ve düzenle linkine tıkla
  cy.get('[data-cy="user-list"]')
    .contains(userName)
    .parent()
    .find('a[href*="/edit"], button:contains("Düzenle")')
    .first()
    .click({ force: true });
  cy.wait(1000);
});

When('adı {string} olarak değiştirir', (newName) => {
  cy.wait(500);
  cy.get('[data-cy="user-name-input"]')
    .should('be.visible')
    .clear()
    .type(newName);
});

When('kullanıcı {string} için sil butonuna tıklar', (userName) => {
  cy.wait(1000);
  cy.visit(`${FRONTEND_URL}/users`);
  cy.wait(1000);
  // Kullanıcıyı bul ve sil butonuna tıkla
  cy.get('[data-cy="user-list"]')
    .contains(userName)
    .parent()
    .find('button:contains("Sil"), [data-cy^="delete-user"]')
    .first()
    .click({ force: true });
  cy.wait(500);
});

// // Silme onayı artık common_steps.js'de

// Then('kullanıcı listesinde {string} olmalı', (ad) => {
//   // Sayfa zaten /users'da olmalı (redirect sonrası)
//   cy.url().then((url) => {
//     if (!url.includes('/users')) {
//       cy.visit(`${FRONTEND_URL}/users`);
//     }
//   });
//   cy.wait(2000); // Liste güncellenmesi için yeterince bekle
//   // Kullanıcı listesinde adı ara
//   cy.get('[data-cy="user-list"]', { timeout: 5000 })
//     .should('be.visible')
//     .should('contain', ad);
// });

// Then('kullanıcı listesinde {string} olmamalı', (name) => {
//   cy.wait(1000);
//   cy.visit(`${FRONTEND_URL}/users`);
//   cy.wait(1000);
//   cy.get('[data-cy="user-list"]')
//     .should('not.contain', name);
// });

// Given('sistemde kayıtlı kullanıcılar var', () => {
//   // Ensure at least one user exists
//   cy.apiRequest('GET', '/users', null).then((response) => {
//     if (!Array.isArray(response.body) || response.body.length === 0) {
//       cy.createUser('Test User', 'test@example.com');
//     }
//   });
//   cy.wait(1000);
//   cy.visit(`${FRONTEND_URL}/users`);
//   cy.wait(1000);
// });

// When('kullanıcı listesinden ilk kullanıcıya tıklar', () => {
//   cy.wait(1000);
//   cy.get('[data-cy="user-list"]')
//     .find('li, [data-cy="user-list-item"]')
//     .first()
//     .find('a')
//     .first()
//     .click({ force: true });
//   cy.wait(1000);
// });

// Then('kullanıcı detay sayfası açılmalı', () => {
//   cy.url().should('match', /\/users\/\d+/);
//   cy.get('[data-cy="user-detail"], .user-detail').should('be.visible');
// });

// Then('kullanıcı bilgileri görünür olmalı', (dataTable) => {
//   const fields = dataTable.hashes().map(row => row.Ad || row.Field);
//   fields.forEach((field) => {
//     if (field === 'Ad' || field === 'Name') {
//       cy.get('[data-cy="user-name"], .user-name').should('be.visible');
//     } else if (field === 'Email') {
//       cy.get('[data-cy="user-email"], .user-email').should('be.visible');
//     }
//   });
// });

// Then('form sayfasında kalmalı', () => {
//   cy.url().should('match', /\/users\/(new|\d+\/edit)/);
// });

// Then('hata mesajı {string} görünmeli', (errorMessage) => {
//   cy.wait(1000);
//   // react-hot-toast hata mesajı için
//   cy.contains('[data-testid="toast"], [role="status"], div[class*="go"]', errorMessage, { timeout: 5000 })
//     .should('exist')
//     .should('be.visible');
// });

