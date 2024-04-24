Feature: Verify that all functionalities of student groups working correctly

    Background: open the admin page
        Given navigate to sabboura website
        And  login with valid credentials
        And  click on "Classrooms" link

    Scenario: verify create new student group
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type            | value       |
            | classroomcode | code            | 1           |
            | classroomname | text            | Red         |
            | selectGrade   | dropdown        | 2           |
            | classroomname | search_dropdown | Mathematics |
        And    click on "Subjects" text
        And    click on "Save" link
        And    I wait "3" second
        Then I verify the appearance of the success Msg "ClassRoom_CreatedMessage"

    Scenario: verify create new student group with dublicate code and name in same grade
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type            | value       |
            | classroomcode | code            | 1           |
            | classroomname | text            | Red         |
            | selectGrade   | dropdown        | 3           |
            | classroomname | search_dropdown | Mathematics |
        And    click on "Subjects" text
        And    click on "Save" link
    # Then error message should contains message "ClassRoom_InvalidTitleOrCode"

    Scenario: verify create student group with dublicate name in another grade
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type            | value       |
            | classroomcode | code            | 2           |
            | classroomname | text            | Red         |
            | selectGrade   | dropdown        | 3           |
            | classroomname | search_dropdown | Mathematics |
        And    click on "Subjects" text
        And    click on "Save" link
        And    I wait "3" second
        Then I verify the appearance of the success Msg "ClassRoom_CreatedMessage"

    Scenario: verify create new student group with code and name exceed max chars
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type     | value          |
            | classroomcode | longText | longTextRandom |
            | classroomname | longText | longTextRandom |
        And    click on "Save" link
        Then verify name validation error Msg "ClassRoom_ClassroomTitleLength"
        And  verify code validation error Msg "ClassRoom_ClassroomUdClassroomIdLength"

    Scenario: verify create student group with name less than min characters
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type | value |
            | classroomname | text |   A   |
        And    click on "Save" link
        Then verify name validation error Msg "ClassRoom_ClassroomTitleLength"

    Scenario: verify create student group with invalid code or name contains special characters
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type | value    |
            | classroomcode | code | 1'@#$%   |
            | classroomname | text | Red'@#$% |
        And    click on "Save" link
        Then verify name validation error Msg "ClassCodeAlphanumericValidation"
        And  verify code validation error Msg "ClassCodeAlphanumericValidation"

    Scenario: verify code , name and grade are mandatory while create  student group
        Given  click on "ClassRoom_AddNewClassroom" text
        And    click on "Save" link
        Then verify code validation error Msg "RequiredValidationMessage"
        And  verify name validation error Msg "RequiredValidationMessage"
        And  verify grade validation error Msg "RequiredValidationMessage"

    Scenario: verify edit student group info
        Given  click on 3 dots of student group
        And    click on "Edit" text
        When   I fill the form with the following:
            | field           | type            | value         |
            | classroomudcode | code            | ب-3           |
            | classroomtitle  | text            | الوان الربيع  |
            | classroomname   | search_dropdown | اللغة العربية |
        And    check grade feild is disabled
        And    click on "Subjects" text
        And    click on "Save" link
        Then   I verify the appearance of the success Msg "ClassRoom_UpdatedMessage"

    Scenario: verify add student to student group
        Given  click on 3 dots of student group
        When   click on "AddStudents" text
        And    I fill the form with the following:
            | field       | type      | value   |
            | StudentCode | code      | st_1    |
            | FirstName   | firstName | Auto    |
            | LastName    | lastName  | Student |
        And   check Grade and studentGroup names of student
        And   click on "Create" button
        And   I wait for "2" second


    Scenario: verify Delete student group linked to student
        Given  click on 3 dots of student group
        And    click on "Delete" button
        And    I wait for "3" second
        Then   error message should contains message "ClassRoom_CanNotRemoveMsg"

    Scenario: verify Delete student group not linked to student
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "(//*[@class='dropdown-component'])[2]" byXpath
        And    click on "DeleteAll" link
        And    click on "DeleteAll" link
        And    I wait for "2" second
        Then   go back
        And    click on 3 dots of student group
        Then   click on "Delete" button
        And    I wait for "3" second
        And    click on "Delete" text
        And    I wait for "3" second
        Then   I verify the appearance of the success Msg "ClassRoom_DeletedMessage"
        And    click on 3 dots of student group
        Then   click on "Delete" button
        And    I wait for "3" second
        And    click on "Delete" text
        And    I wait for "3" second
        Then   I verify the appearance of the success Msg "ClassRoom_DeletedMessage"




