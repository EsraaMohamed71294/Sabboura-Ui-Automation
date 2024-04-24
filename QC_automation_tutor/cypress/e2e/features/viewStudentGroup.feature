Feature: Verify all actions in view of student group

    Background: open the admin page
        Given navigate to sabboura website
        And  login with valid credentials
        And  click on "Classrooms" link

    Scenario: check Student group's name ,grade ,code and subjects in view
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type            | value       |
            | classroomcode | code            | B3          |
            | classroomname | text            | Class A     |
            | selectGrade   | dropdown        | 1           |
            | classroomname | search_dropdown | Mathematics |
        And    click on "Subjects" text
        And    click on "Save" link
        And    I wait "3" second
        And    click on 3 dots of student group
        And    click on "View" button
        Then   verify name ,code ,grade and sugjects of student group
        And    I wait "3" second

    Scenario: check the list is empty and XLS is dimmed
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        And    check Xls link is dimmed
        And    check empty message of student group list "Classroom_StudentsEmpty"

    Scenario: check edit student group from view
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        And    click on "Edit" link
        When   I fill the form with the following:
            | field           | type            | value         |
            | classroomudcode | code            | ب-3           |
            | classroomtitle  | text            | الوان الربيع  |
            | classroomname   | search_dropdown | اللغة العربية |
        And    click on "Save" link
        And    I wait "3" second
        Then   Verify data of student group edited successfully

 Scenario: check edit student group by removing subject
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        And    click on "Edit" link
        And    verify remove subject from student group

    Scenario: verify add student from 3 dots
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        When   click on "AddStudents" link
        And    I fill the form with the following:
            | field       | type      | value         |
            | StudentCode | code      | randomCode    |
            | FirstName   | firstName | autoFirstName |
            | LastName    | lastName  | autoLasttName |
        And   check Grade and studentGroup names of student
        And   click on "Create" button
        And   I wait for "2" second

    Scenario: verify add student from it's button in view
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "(//*[@class='f-icon plus-icon'])[1]" byXpath
        And    I fill the form with the following:
            | field       | type      | value   |
            | StudentCode | code      | st_1    |
            | FirstName   | firstName | Auto    |
            | LastName    | lastName  | Student |
        And   check Grade and studentGroup names of student
        And   click on "Create" button
        And   I wait for "2" second

    Scenario: verify search in the list by student code ,name and username
        Given  click on 3 dots of student group
        And    click on "View" button
        When   search about "studentCode"
        And    search about "FirstName"
        And    search about "LastName"
        And    search about "username"
        And    search about "studnetNotExist"

    Scenario: verify download XLS file
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        When   click on "XLS" download link
        Then   verify the file "StudentsList.xlsx" is downloaded successfully

    Scenario: check edit,reset password,activate and deactivate of each student
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click the created student "Edit"
        Then   check navigation of edit student
        And    I wait for "2" second
        And    check Reset password is dimmed for the new students
        When   click the created student "Deactivate"
        And    click on "Deactivate" link
        And    I wait for "3" second
        Then   I verify the appearance of the success Msg "DeactivateStudentSuccessMessage"
        And    check that studnet is deactivated
        When   click the created student "Activate"
        And    click on "Activate" link
        And    I wait for "3" second
        Then   I verify the appearance of the success Msg "ActivateStudentSuccessMessage"
        And    check that studnet is activated

    Scenario: verify Delete student group linked to students
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        When   click on "Delete" link
        And    I wait for "3" second
        Then   error message should contains message "ClassRoom_CanNotRemoveMsg"


    Scenario: verify transfer student to another studentgroup
        Given  click on "ClassRoom_AddNewClassroom" text
        When   I fill the form with the following:
            | field         | type            | value       |
            | classroomcode | code            | B5          |
            | classroomname | text            | Class C     |
            | selectGrade   | dropdown        | 1           |
            | classroomname | search_dropdown | Mathematics |
        And    click on "Subjects" text
        And    click on "Save" link
        And    I wait "3" second
        And    click on "(//div[@class='info-cards__card__header'])[2]" byXpath
        And    click the created student "Transfer"
        And    transfer student to another studentgroup
        And    click on "Transfer" link
        And    I wait "5" second
        Then   I verify the appearance of the success Msg "TransferStudnetSuccessMessage"
        And    go back
        And    click on "(//div[@class='info-cards__card__header'])[1]" byXpath
        And    search about "studentCode"

    Scenario: check delete of each student
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click the created student "Delete"
        When   click on "Delete" link
        And    I wait for "2" second
        Then   I verify the appearance of the success Msg "DeleteStudentSuccessMsg"

    Scenario: check Reset All Password ,Activate All ,Deactivate All and Delete All students
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        When   click on "AddStudents" link
        And    I fill the form with the following:
            | field       | type      | value         |
            | StudentCode | code      | randomCode    |
            | FirstName   | firstName | autoFirstName |
            | LastName    | lastName  | autoLasttName |
        And   click on "Create" button
        And   I wait for "2" second
        And   check actions of All studens "ResetAllPassword"
        And   check actions of All studens "DeactivateAll"
        And   I wait for "3" second
        Then  I verify the appearance of the success Msg "DeactivateStudentSuccessMessage"
        And   check actions of All studens "ActivateAll"
        And   I wait for "3" second
        Then  I verify the appearance of the success Msg "ActivateStudentSuccessMessage"
        And   check actions of All studens "DeleteAll"
        And   I wait for "3" second
        Then  I verify the appearance of the success Msg "DeleteStudentSuccessMsg"

      Scenario: verify pagination of the students list
        Given  go back
        And    click on "Students" link
        And    click on "CreateStudents" link
        And    click on "Multiple" text
        And    I wait "3" second
        And    upload the file "MultipleStudents.xlsx"
        And    I wait "4" second
        And    click on "Upload" button
        And    I wait "8" second
        And    go back
        And    go back
        And    click on "Classrooms" link   
        And    click on 3 dots of student group
        And    click on "View" button
        And    refresh the page
        And    scroll down
        Then   Check pagination of the studnets list Next
        And    scroll down
        Then   Check pagination of the studnets list Previous
     
    Scenario: verify Delete student group not linked to student
        Given  click on 3 dots of student group
        And    click on "View" button
        And    click on "(//*[@class='dropdown-component'])[2]" byXpath
        And    click on "DeleteAll" link
        And    I wait for "2" second
        And    click on "DeleteAll" link
        And    I wait for "5" second
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        And    click on "Delete" link
        And    I wait for "3" second
        And    click on "Delete" link
        And    I wait for "3" second
        And    click on 3 dots of student group
        And    click on "View" button
        And    click on "(//*[@class='dropdown-component'])[2]" byXpath
        And    click on "DeleteAll" link
        And    I wait for "2" second
        And    click on "DeleteAll" link
        And    I wait for "5" second
        And    click on "//*[@class='btn btn-primary btn-outline dropdown-btn']" byXpath
        When   click on "Delete" link
        And    I wait for "3" second
        And    click on "Delete" text
        And    I wait for "5" second
        Then   I verify the appearance of the success Msg "ClassRoom_DeletedMessage"

   