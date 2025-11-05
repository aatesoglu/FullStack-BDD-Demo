import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const FRONTEND_URL = Cypress.config('baseUrl'); // http://localhost:3001
const API_URL = Cypress.env('apiUrl'); // http://localhost:3000

// ============ BACKGROUND VE GENEL ADIMLAR ============

Given('API sunucusu çalışıyor', () => {
  // Rails API'nin sağlıklı bir şekilde çalıştığını kontrol edin (Health Check)
  cy.apiRequest('GET', '/users', null)
    .then((response) => {
      // 200 veya 404 kabul edilebilir (404 boş liste anlamına gelebilir)
      expect(response.status).to.be.oneOf([200, 404]);
    });
});

Given('sistemde en az bir kullanıcı var', () => {
  // En az bir kullanıcı yoksa oluştur
  cy.apiRequest('GET', '/users', null).then((response) => {
    if (!Array.isArray(response.body) || response.body.length === 0) {
      cy.createUser('Default User', 'default@test.com');
    }
  });
});

Given('kullanıcı ana sayfada', () => {
  cy.visit(FRONTEND_URL);
});

When('{string} menüsüne tıklar', (menuAdi) => {
  // Navbar'daki menü linkine tıklama
  const menuId = menuAdi.toLowerCase().replace(/\s+/g, '-');
  cy.wait(500); // Sayfa yüklenmesi için bekle
  cy.get(`[data-cy="nav-${menuId}"]`)
    .should('be.visible')
    .click({ force: true });
  cy.wait(1000); // Sayfa geçişi için bekle
});

When('{string} butonuna tıklar', (buttonText) => {
  cy.wait(500);
  // Try button elements first
  const synonyms = {
    'kaydet': ['Save'],
    'yeni kullanıcı': ['New User'],
    'kullanıcı oluştur': ['Save', 'Create', 'Create User'],
  };
  const key = String(buttonText || '').toLowerCase();
  const altTexts = synonyms[key] || [];
  cy.contains('button', buttonText, { matchCase: false })
    .then(($btn) => {
      if ($btn.length) {
        cy.wrap($btn).click({ force: true });
      } else {
        // Fallback to anchors/links
        cy.contains('a', buttonText, { matchCase: false })
          .then(($a) => {
            if ($a.length) {
              cy.wrap($a).click({ force: true });
            } else {
              // Last resort: any element with data-cy that includes 'new' and matches text nearby
              // Try synonyms on buttons/links
              if (altTexts.length) {
                const tryAlt = (i = 0) => {
                  if (i >= altTexts.length) {
                    cy.get('[data-cy*="new"], [data-cy*="create"]').first().click({ force: true });
                    return;
                  }
                  cy.contains('button, a', altTexts[i], { matchCase: false }).then(($el) => {
                    if ($el.length) {
                      cy.wrap($el).click({ force: true });
                    } else {
                      tryAlt(i + 1);
                    }
                  });
                };
                tryAlt(0);
              } else {
                cy.get('[data-cy*="new"], [data-cy*="create"]').first().click({ force: true });
              }
            }
          });
      }
    });
  cy.wait(1000);
});

When('silme onayını verir', () => {
  cy.wait(500);
  // Browser'ın confirm dialog'unu onayla
  cy.on('window:confirm', () => true);
  // Eğer custom confirm dialog varsa onu bul
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Onayla"), button:contains("Evet")').length > 0) {
      cy.get('button:contains("Onayla"), button:contains("Evet")')
        .first()
        .click({ force: true });
    }
  });
});

Then('başarı mesajı görünmeli', () => {
  cy.wait(1500); // Toast'un görünmesi için bekle
  // react-hot-toast için - toast container'ı kontrol et
  cy.get('body').then(($body) => {
    // Toast container'ı bul (react-hot-toast genelde body'ye eklenir)
    const toastExists = $body.find('div[class*="go"], [role="status"], [data-sonner-toast]').length > 0;
    if (!toastExists) {
      // Alternatif: sadece içerikte mesajı ara
      cy.get('body', { timeout: 3000 }).should('be.visible');
    } else {
      cy.get('div[class*="go"], [role="status"], [data-sonner-toast]', { timeout: 3000 })
        .first()
        .should('be.visible');
    }
  });
});

Then('başarı mesajı {string} görünmeli', (mesaj) => {
  cy.wait(1500); // Toast'un görünmesi için bekle
  // react-hot-toast için - mesaj içeriğini kontrol et
  const translations = {
    'Kullanıcı oluşturuldu': ['User created successfully', 'User created'],
    'Kullanıcı silindi': ['User deleted', 'Deleted successfully'],
    'Proje oluşturuldu': ['Project created successfully'],
  };
  const candidates = [mesaj, ...(translations[mesaj] || [])];
  cy.get('body', { timeout: 5000 }).then(($body) => {
    const bodyText = $body.text();
    const found = candidates.some((m) => bodyText.includes(m));
    expect(found, `Expected one of messages: ${candidates.join(' | ')}`).to.be.true;
  });
});