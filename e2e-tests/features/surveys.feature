Feature: Surveys Management
  As a user
  I want to manage surveys
  So that I can run questionnaires

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all surveys
    When "Surveys" menüsüne tıklar
    Then anket listesi görünür olmalı

