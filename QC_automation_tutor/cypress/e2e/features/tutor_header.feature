Feature: verfiy that all pages in the header should open correctly

  Background: open the admin page
    Given navigate to sabboura website
    And   login with valid credentials

 Scenario: verfiy that the All pages in the header should be open correctly
    Given  check navigation to "Homework"
    And    check navigation to "Chat"
    And    check navigation to "Connect"
    And    check navigation to "MyLibrary"
    And    check navigation to "MyAccount"

  Scenario: verfiy that the All sub-pages under users should be open correctly
    Given  check navigation to "Classrooms"
    And    check navigation to "Students"
    And    check navigation to "Assistants"
    And    check navigation to "SignedUp_Students"
    And    check navigation to "Reports"

  Scenario: verfiy that the All sub-pages under MY Account should be open correctly
    Given  check navigation to "MyInfo"
  








