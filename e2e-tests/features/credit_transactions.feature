Feature: Credit Transactions Management
  As a user
  I want to manage credit transactions
  So that I can see recorded transactions

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all credit transactions
    When "Credit Transactions" menüsüne tıklar
    Then kredi işlemleri listesi görünür olmalı
