# FullStack-BDD-Demo

**Ruby on Rails 8 API**, **Next.js (React)** frontend ve **Cypress (BDD/Cucumber)** test altyapısı kullanılarak geliştirilmiş tam yığın (Full Stack) örnek bir projedir.  

Bu proje, 8 farklı modeli (**Users**, **Projects**, **Scales**, **Scale Items**, **Surveys**, **Analyses**, **Credit Transactions**, **Responses**) yönetmekte ve uçtan uca test senaryolarını otomatik olarak çalıştırmaktadır.

---

## 🚀 Özellikler

- ⚙️ **Rails 8** tabanlı RESTful API (`/api/v1` namespace)
- 🖥️ **Next.js 13+ App Router** ile modern frontend arayüzü
- 🧪 **Cypress + Cucumber (BDD/Gherkin)** test senaryoları
- 🎬 **FFmpeg** ile test videolarını birleştirme (isteğe bağlı)
- 🔗 **Rails–Next.js** tam entegrasyon yapısı

---

## 🧩 Teknoloji Yığını

| Katman | Teknoloji |
|:-------|:-----------|
| **Backend** | Ruby on Rails 8 (REST API) |
| **Frontend** | Next.js 13+, React |
| **Test** | Cypress, Cucumber, Gherkin |
| **Video İşleme** | FFmpeg (isteğe bağlı) |

---

## 🧰 Kurulum Adımları

### 1️⃣ Rails API Kurulumu

Aşağıdaki komutlarla Ruby on Rails ortamını kurun:

```bash
bundle install
# Gerekirse .env veya config dosyalarını doldurun
# rails db:migrate

--
# 🔧 Frontend Kurulumu
cd frontend
npm install
--
# ▶️ Çalıştırma

# Rails API (http://localhost:3000)
rails s
--
# Frontend (http://localhost:3001)
cd frontend
npm run dev
--
# 🧪 Testler

# Tüm testleri çalıştırmak için
cd e2e-tests
npx cypress run
--
# Cypress GUI (görsel test arayüzü)
npx cypress open
--
# 📝 Notlar

# e2e-tests/.gitignore dosyası, cypress/videos ve cypress/screenshots klasörlerini hariç tutar.
# Her model için örnek navigation, listeleme ve “New” sayfaları bulunmaktadır.
