Feature: Kullanıcı Yönetimi
  Rails 8 API üzerinden kullanıcı CRUD işlemleri

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: Kullanıcı listesi görünür
    When "Kullanıcılar" menüsüne tıklar
    Then kullanıcı listesi görünür olmalı

  Scenario: Kullanıcı detaylarını görüntüleme
    Given sistemde kayıtlı kullanıcılar var
    When kullanıcı listesinden ilk kullanıcıya tıklar
    Then kullanıcı detay sayfası açılmalı
    And kullanıcı bilgileri görünür olmalı
      | Ad    |
      | Email |
