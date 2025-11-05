# 🧩 Ruby on Rails 8 – API + Hello World Uygulaması

Bu proje, **Ruby on Rails 8** kullanılarak geliştirilmiş bir **API tabanlı web uygulamasıdır.**  
Uygulama hem basit bir **“Hello World” arayüzü**, hem de 8 modelden oluşan **RESTful API yapısını** içerir.  
Amaç, bir Rails projesinde hem klasik MVC yapısını hem de API mantığını birlikte göstermektir.

---

## 🧱 Teknolojiler ve Yapı

- **Ruby on Rails 8.0**
- **SQLite3** (geliştirme ortamı için)
- **Active Record** ORM yapısı
- **RESTful Controller** mimarisi
- **JSON tabanlı veri dönüşleri**

---
## 🚀 Kurulum ve Çalıştırma

1.Depoyu klonla
git clone https://github.com/aatesoglu/Ruby-on-Rails-8-Hello-World-ve-API-Yap-s-.git

2. Gerekli Bağımlılıkları Yükle
bundle install

3. Veritabanını Oluştur ve Migrasyonları Çalıştır
rails db:create
rails db:migrate

# Sunucuyu başlat
rails server
# veya
rails s
```

### 5. Tarayıcıda Görüntüle
```
http://localhost:3000
```

> **📌 Not:** Eğer `launchy` hatası alırsan:
> ```bash
> bundle install --gemfile ./Gemfile
> ```

---

## 🧠 Teknik Bilgiler

- **Ruby on Rails 8:** MVC mimarisiyle geliştirilmiş modern web framework
- **Active Record (ORM):** Ruby nesneleriyle veritabanı tablolarını eşleştirir
- **Controller:** `Api::V1::ScaleItemsController` dosyası CRUD işlemlerini yürütür
- **View (Hello World):** `welcome#index` rotası üzerinden basit metin döndürür
- **Route:** `config/routes.rb` dosyasında hem root hem API endpoint'leri tanımlıdır

---

## ⚙️ API Yapısı

Proje, `app/controllers/api/v1/` dizininde bulunan 8 adet model tabanlı controller içerir.

### Temel API Yolu
```
/api/v1/
```

### Mevcut Modeller

- `User`
- `Project`
- `Scale`
- `Survey`
- `Analysis`
- `CreditTransaction`
- `Response`
- `ScaleItem`

Her model, ilişkili tabloyla etkileşim kurar ve JSON formatında veri döndürür.

---

## 🧩 Örnek Endpoint (ScaleItem)

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/api/v1/scale_items` | Tüm öğeleri listeler |
| `POST` | `/api/v1/scale_items` | Yeni öğe oluşturur |
| `PUT` | `/api/v1/scale_items/:id` | Belirli bir öğeyi günceller |
| `DELETE` | `/api/v1/scale_items/:id` | Bir öğeyi siler |

---

## 🧱 Proje Dizin Yapısı
```
myapp/
│
├── app/
│   ├── controllers/
│   │   ├── api/v1/
│   │   │   ├── users_controller.rb
│   │   │   ├── projects_controller.rb
│   │   │   ├── scales_controller.rb
│   │   │   ├── surveys_controller.rb
│   │   │   ├── analyses_controller.rb
│   │   │   ├── credit_transactions_controller.rb
│   │   │   ├── responses_controller.rb
│   │   │   └── scale_items_controller.rb
│   │   └── welcome_controller.rb
│   ├── models/
│   │   ├── user.rb
│   │   ├── project.rb
│   │   ├── scale.rb
│   │   ├── survey.rb
│   │   ├── analysis.rb
│   │   ├── credit_transaction.rb
│   │   ├── response.rb
│   │   └── scale_item.rb
│   └── views/welcome/
│       └── index.html.erb   ← "Hello World" sayfası
│
├── db/migrate/              ← SQLite3 uyumlu migration dosyaları
├── config/routes.rb         ← API + arayüz yönlendirmeleri
└── README.md

## 💡 Notlar

-Uygulama geliştirme ortamında SQLite3 veritabanı kullanır.
-Üretim ortamında PostgreSQL gibi kalıcı bir veritabanı tercih edilmelidir.
-API tüm yanıtları JSON formatında döndürür.
