Feature: all pages in the footer should open correctly

  Background: open the admin page
    Given navigate to sabboura website
    And  login with valid credentials

  Scenario: verfiy that the All pages in the footer should be open correctly
      Given   check footer "ContactUSTitle"
      And     check footer "PrivacyPolicyPageTitle"
      And     check footer "TermsAndConditionsPageTitle"

