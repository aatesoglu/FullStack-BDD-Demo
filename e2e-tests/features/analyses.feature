Feature: Analyses Management
  As a user
  I want to manage analyses
  So that I can see available analyses

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all analyses
    When "Analyses" menüsüne tıklar
    Then analiz listesi görünür olmalı
