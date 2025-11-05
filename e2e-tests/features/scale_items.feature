Feature: Scale Items Management
  As a user
  I want to manage scale items
  So that I can build survey questions

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all scale items
    When "Scale Items" menüsüne tıklar
    Then ölçek maddeleri listesi görünür olmalı

