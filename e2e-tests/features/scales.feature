Feature: Scale Management
  As a user
  I want to manage scales
  So that I can use them in surveys

  Background:
    Given API sunucusu çalışıyor
    And kullanıcı ana sayfada

  Scenario: List all scales
    When "Scales" menüsüne tıklar
    Then ölçek listesi görünür olmalı

