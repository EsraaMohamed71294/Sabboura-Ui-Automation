import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { GradeTitle, studentGroupTitle } from "./studentGroups";
import { get_value_by_key } from "./basic_steps";
import {read_localization_file} from './basic_steps'
import { currentCode, resource_file} from "./basic_steps";

var gradeName = "";
var studentGroupName = "";
var StudentGroupCode = "";
var StudentGroupSubjects = "";
var expectedResult = "";

When(/^verify name ,code ,grade and sugjects of student group$/, (y) => {
  cy.xpath("//*[@class='page-title with-cta']//h1").then(($StudentGroup) => {
    studentGroupName = $StudentGroup.text().trim();
    cy.log(studentGroupName);
    expect(studentGroupName).to.contains(studentGroupTitle);
  });
  cy.xpath("//*[@class='page-title with-cta']//h1//small[1]").then(($Grade) => {
    gradeName = $Grade.text();
    expect(gradeName).to.equal(GradeTitle);
  });
  cy.xpath("//*[@class='page-title with-cta']//h1//small[2]").then(($Code) => {
    StudentGroupCode = $Code.text();
    expect(StudentGroupCode).to.equal("B3");
  });
  cy.xpath(
    "//*[@class='page-title with-cta']//div[@class='inline flex-wrap']"
  ).then(($Subjects) => {
    StudentGroupSubjects = $Subjects.text().trim();
    expect(StudentGroupSubjects).to.contains("Mathematics");
  });
});

When(/^Verify data of student group edited successfully$/, () => {
  cy.xpath("//*[@class='page-title with-cta']//h1").should(
    "contain",
    "الوان الربيع"
  );
  cy.xpath("//*[@class='page-title with-cta']//h1//small[2]").should(
    "contain",
    "ب-3"
  );
  cy.xpath(
    "//*[@class='page-title with-cta']//div[@class='inline flex-wrap']"
  ).should("contain", "اللغة العربية");
});

When(/^verify remove subject from student group$/, () => {
  cy.xpath(
    "//*[contains(text(),'اللغة العربية')]//span[@class='select2-selection__choice__remove']"
  ).click();
  cy.get("#classroomtitle").click();
  cy.get("#confirm-edit-studentGroup-btn").click();
  cy.wait(3000);
  cy.xpath(
    "//*[@class='page-title with-cta']//div[@class='inline flex-wrap']"
  ).should("not.have.text", "اللغة العربية");
});

When(/^verify the file "([^"]*)" is downloaded successfully$/, (file_name) => {
  cy.readFile(`cypress/downloads/${file_name}`).should('exist');
  // cy.verifyDownload(`cypress/downloads/${file_name}`);
});

When(/^click on "([^"]*)" download (link|button)$/, (text_key, field_type) => {
  var text_value = resource_file.data.find((e) => e.key === text_key).value;
  // this adds a listener that reloads your page
  // after 5 seconds from clicking the download button
  cy.window()
    .document()
    .then(function (doc) {
      doc.addEventListener("click", () => {
        setTimeout(function () {
          doc.location.reload();
        }, 4000);
      });
      switch (field_type) {
        case "link":
          cy.get("a").contains(text_value).click();
          break;
        case "button":
          cy.get("button").contains(text_value).click();
          break;
      }
    });
});

When(/^upload the file "([^"]*)"$/, (file) => {
  cy.get('#UploadedFile').attachFile(file , {timeout: 5000});
});

When(/^Remove the file from downloads$/, () => {
  cy.deleteDownloadsFolder();
});

When(/^check empty message of student group list "([^"]*)"$/, (text_key) => {
  var text_value = get_value_by_key(text_key);
  cy.xpath("//*[@class='message']").should("contain", text_value);
});

When(/^check Xls link is dimmed$/, () => {
  cy.xpath("//*[@class='dropdown opened']//li[3]").should(
    "have.class",
    "disabled"
  );
});

When(/^Check pagination of the studnets list (Next|Previous)$/, (value) => {
  if (value == "Next")
    {cy.get('#nextPage').should('contain','50').click()}
  else if  (value == "Previous")
    {cy.get('#prevPage').should('contain','100').click()}
});

When(/^click the created student "([^"]*)"$/, (option) => {
  cy.xpath(
    `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='dropdown-btn']`
  ).click();

  if (option == "Edit") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//i[@class='f-icon pen-icon']/parent::a`
    ).click();
  } else if (option == "Transfer") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='transferStudentBtn']`
    ).click();
  } else if (option == "Delete") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='text-red delete-student-btn']`
    ).click();
  } else if (option == "Activate") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='activate-student-btn']`
    ).click({ force: true });
  } else if (option == "Deactivate") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='deactivate-student-btn']`
    ).click({ force: true });
  } else if (option == "ResetPassword") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='reset-password-btn']`
    ).click();
  }
});

When(/^check navigation of edit student$/, () => {
  cy.url().should("include", "https://users.sabboura.com/Student/EditStudent");
  cy.go("back");
});

When(/^check Reset password is dimmed for the new students$/, () => {
  cy.xpath(
    `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a[@class='dropdown-btn']`
  ).click();
  cy.xpath(
    `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//li`
  ).should("have.class", "disabled");
});

When(/^check that studnet is (deactivated|activated)$/, (option) => {
  cy.xpath(
    `//td[contains(text(),'${currentCode}')]/..//a[@class='dropdown-btn']`
  ).click();
  cy.wait(3000);
  if (option == "deactivated") {
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a`
    ).should("have.class", "activate-student-btn");
    cy.xpath(`//td[contains(text(),'${currentCode}')]/..//..//tr`).should(
      "have.class",
      "no-wrap deactivated-partly"
    );
  }
  if (option == "activated")
    cy.xpath(
      `//td[contains(text(),'${currentCode}')]/following-sibling::td[4]//a`
    ).should("have.class", "deactivate-student-btn");
});

When(/^transfer student to another studentgroup$/, () => {
  cy.get("#selectClassrooms").select(1);
});

When(/^check actions of All studens "([^"]*)"$/, (option) => {
  cy.xpath(
    `//th[contains(@class,'actions-cell')]//a[@class='dropdown-btn']`
  ).click();
  cy.wait(3000);

  if (option == "ResetAllPassword") {
    cy.xpath(`(//a[@id='reset-all-btn'])[1]//..//..//li[1]`).should(
      "have.class",
      "disabled"
    );
  } else if (option == "ActivateAll") {
    cy.xpath(`(//a[@id='activate-all-btn'])[1]`).click({ force: true });
    cy.get("#confirm-activate-all-btn").click();
  } else if (option == "DeactivateAll") {
    cy.xpath(`(//a[@id='deactivate-all-btn'])[1]`).click({ force: true });
    cy.get("#confirm-deactivate-all-btn").click();
  } else if (option == "DeleteAll") {
    cy.get("#delete-all-btn").click({ force: true });
    cy.get("#confirm-delete-all-btn").click();
  }
});

Given(/^search about "([^"]*)"$/, (page) => {
  if (page == "studentCode") {
    cy.xpath("//tbody/tr[1]/td[1]").then((element) => {
      expectedResult = element.text();
      cy.get("#searchText").click().type(`${expectedResult}`).type("{enter}");
      cy.xpath("//tbody/tr[1]/td[1]").should("contain", expectedResult);
    });
  } else if (page == "FirstName") {
    cy.xpath("//tbody/tr[1]/td[2]").then((element) => {
      expectedResult = element.text();
      cy.get("#searchText").click().type(`${expectedResult}`).type("{enter}");
      cy.xpath("//tbody/tr[1]/td[2]").should("contain", expectedResult);
    });
  } else if (page == "LastName") {
    cy.xpath("//tbody/tr[1]/td[3]").then((element) => {
      expectedResult = element.text();
      cy.get("#searchText").click().type(`${expectedResult}`).type("{enter}");
      cy.xpath("//tbody/tr[1]/td[3]").should("contain", expectedResult);
    });
  } else if (page == "username") {
    cy.xpath("//tbody/tr[1]/td[4]").then((element) => {
      expectedResult = element.text();
      cy.get("#searchText").click().type(`${expectedResult}`);
      cy.get("#searchBtn").click();
      cy.xpath("//tbody/tr[1]/td[4]").should("contain", expectedResult);
    });
  } else {
    cy.get("#searchText").click().type(`${page}`).type("{enter}");
    cy.get(".message").should(
      "contain",
      get_value_by_key("Classroom_StudentsEmpty")
    );
  }

  cy.get("#clearBtn").click();
});
