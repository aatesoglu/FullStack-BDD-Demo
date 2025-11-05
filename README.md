FullStack-BDD-Demo
Ruby on Rails 8 API, Next.js (React) frontend ve Cypress (BDD/Cucumber) test altyapısı kullanılarak geliştirilmiş tam yığın (Full Stack) örnek bir projedir.
8 farklı model (Users, Projects, Scales, Scale Items, Surveys, Analyses, Credit Transactions, Responses) yönetilmekte ve uçtan uca test senaryoları otomatik olarak çalıştırılmaktadır.

🚀 Özellikler
Rails 8 tabanlı RESTful API (/api/v1 namespace)
Next.js 13+ App Router ile frontend arayüzü
Cypress + Cucumber (BDD/Gherkin) test senaryoları
FFmpeg ile test videolarını birleştirme (isteğe bağlı)Rails–Next.js tam entegrasyon yapısı
🧩 Teknoloji Yığını
Katman	Teknoloji
Backend	Ruby on Rails 8 (REST API)
Frontend	Next.js 13+, React
Test	Cypress, Cucumber, Gherkin
Video İşleme	FFmpeg (isteğe bağlı)
🧰 Kurulum
1️⃣ Rails API
bundle install
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
