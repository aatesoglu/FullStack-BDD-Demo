Feature: Responses Management
  As a user
  I want to manage responses
  So that I can see collected responses

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all responses
    When "Responses" menüsüne tıklar
    Then cevap listesi görünür olmalı
