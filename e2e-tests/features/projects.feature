Feature: Proje Yönetimi
  Kullanıcılar projelerini yönetebilir

  Background:
    Given API sunucusu çalışıyor
    And sistemde en az bir kullanıcı var

  Scenario: Tüm projeleri listeleme
    Given kullanıcı ana sayfada
    When "Projeler" menüsüne tıklar
    Then proje listesi görünür olmalı

 
