import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { get_value_by_key } from "./basic_steps";
// var saved_links_title = [];
// var displayed_page_title = [];

When(/^check navigation to "(Users|Homework|Chat|Connect|MyLibrary|Reports|MyAccount|MyInfo|Students|Assistants|SignedUp_Students|Classrooms)"$/,(tab) => {
  let linkName = get_value_by_key(tab);

  function verify_tabs_title() {
    cy.get("a").contains(linkName).click();
    cy.xpath("(//h1)[1]").then((title) => {
      const tempTitle = title.text();
      cy.log(tempTitle);
      expect(tempTitle.trim()).to.contains(linkName.trim());
    });
  }
  switch (tab) {
    case "Users":
      verify_tabs_title();
      cy.url().should("include", "https://tutors.sabboura.com/");
      cy.go("back")
      break;

    case "Homework":
      cy.log(linkName);
      verify_tabs_title();
      cy.url().should("include", "https://assessments.sabboura.com/");
      cy.go("back")
      break;

    case "Chat":
      verify_tabs_title();
      cy.url().should("include", "https://chat.sabboura.com/");
      cy.go("back")
      break;

    case "Connect":
      verify_tabs_title();
      cy.url().should("include", "https://tutors.sabboura.com/");
      cy.go("back")
      break;

    case "MyLibrary":
      verify_tabs_title();
      cy.url().should("include", "https://mylibrary.sabboura.com/");
      cy.go("back")
      break;

    case "MyAccount":
      cy.xpath("//*[@class='user-actions']//li[@class='dropdown'][1]").click();
      verify_tabs_title();
      cy.url().should("include", "tutors.sabboura.com/en/myaccount/");
      cy.go("back")
      break;

    case "MyInfo":
      cy.xpath("//*[@class='user-actions']//li[@class='dropdown'][1]").click();
      cy.xpath("//*[@class='dropdown-menu user']//li[1]").click();
      verify_tabs_title();
      cy.url().should("include", "https://users.sabboura.com/MyInfo/");
      cy.go("back")
      break;

    case "Students":
      verify_tabs_title();
      cy.url().should("include", "https://users.sabboura.com/Student/");
      cy.go("back")
      break;

    case "Assistants":
      verify_tabs_title();
      cy.url().should("include", "https://users.sabboura.com/Assistant/AssistantList");
      cy.go("back")
      break;

    case "SignedUp_Students":
      verify_tabs_title();
      cy.url().should("include", "https://users.sabboura.com/Student/SignedUpStudents/");
      cy.go("back")
      break;

    case "Classrooms":
      verify_tabs_title();
      cy.url().should("include", "https://tutors.sabboura.com/");
      cy.go("back")
      break;

    case "Reports":
      var reportKey = "AllPeriodStudentsActivity";
      var ReportName = get_value_by_key(reportKey);
      cy.get("a").contains(linkName).click();
      cy.xpath("(//h1)[1]").then((title) => {
        const tempTitle = title.text();
        cy.log(tempTitle);
        expect(tempTitle.trim()).to.equal(ReportName.trim());
      });
      cy.url().should("include","https://reports.sabboura.com/reports/active_students/");
      cy.go("back")
      break;
  }
});

When(/^check footer "(ContactUSTitle|PrivacyPolicyPageTitle|TermsAndConditionsPageTitle)"$/,(link) => {
  let links = get_value_by_key(link);

  function verify_tab_title() {
    cy.get("a").contains(links).click();
    cy.xpath("(//h1)[1]").then((title) => {
      const tempTitle = title.text();
      cy.log(tempTitle);
      expect(tempTitle.trim()).to.contains(links.trim());
    });
  }
  switch (link) {
    case "ContactUSTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/contact-us/");
      cy.go("back")
      break;

    case "PrivacyPolicyPageTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/privacy/");
      cy.go("back")
      break;

    case "TermsAndConditionsPageTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/terms/");
      cy.go("back")
      break;

    }});



// When(/^I click on the following links:$/, (dataTable) => {
//   let links = dataTable.rawTable;
//   let i;
//   let link_name;
//   for (i of links) {
//     link_name = get_value_by_key(i[0]);
//     cy.get("a").contains(link_name).click();
//     saved_links_title.push(link_name);
//     cy.xpath("//h1").should(($div) => {
//       displayed_page_title.push($div.text());
//     });
//   }
// });

// Then(/^all pages should be displayed correctly$/, () => {
//   for (let i in saved_links_title) {
//     try {
//       if (saved_links_title[i] === "التطبيقات") {
//         expect(displayed_page_title[i]).to.contain(
//           resource_file.data.find((e) => e.key === "AmazingApps").value
//         );
//       } else if (saved_links_title[i] === "الخطط") {
//         expect(displayed_page_title[i]).to.contain(
//           resource_file.data.find((e) => e.key === "LessonPlans").value
//         );
//       } else {
//         expect(displayed_page_title[i]).to.contain(saved_links_title[i]);
//       }
//     } catch (err) {
//       cy.log(err.message);
//     }
//   }
// });


When(/^check navigation to "(Users|Homework|Chat|Connect|MyLibrary|MyAccount|MyInfo|ContactUSTitle|PrivacyPolicyPageTitle|TermsAndConditionsPageTitle)"$/,(tab) => {
  let linkName = get_value_by_key(tab);

  function verify_tabs_title() {
    cy.get("a").contains(linkName).click();
    cy.xpath("(//h1)[1]").then((title) => {
      const tempTitle = title.text();
      cy.log(tempTitle);
      expect(tempTitle.trim()).to.equal(linkName.trim());
    });
  }
  switch (tab) {
    case "Users":
      verify_tabs_title();
      cy.url().should("include", "https://tutors.sabboura.com/");
      cy.go("back")
      break;

    case "Homework":
      cy.log(linkName);
      verify_tabs_title();
      cy.url().should("include", "https://assessments.sabboura.com/");
      cy.go("back")
      break;

    case "Chat":
      verify_tabs_title();
      cy.url().should("include", "https://chat.sabboura.com/");
      cy.go("back")
      break;

    case "Connect":
      verify_tabs_title();
      cy.url().should("include", "https://tutors.sabboura.com/");
      cy.go("back")
      break;

    case "MyLibrary":
      verify_tabs_title();
      cy.url().should("include", "https://mylibrary.sabboura.com/");
      cy.go("back")
      break;

    case "MyAccount":
      cy.xpath("//*[@class='user-actions']//li[@class='dropdown'][1]").click();
      verify_tabs_title();
      cy.url().should("include", "tutors.sabboura.com/en/myaccount/");
      cy.go("back")
      break;

    case "MyInfo":
      cy.xpath("//*[@class='user-actions']//li[@class='dropdown'][1]").click();
      cy.xpath("//*[@class='dropdown-menu user']//li[1]").click();
      verify_tabs_title();
      cy.url().should("include", "https://users.sabboura.com/MyInfo/");
      cy.go("back")
      break;

      case "ContactUSTitle":
        verify_tabs_title();
        cy.url().should("include", "https://www.sabboura.com/contact-us/");
        cy.go("back")
        break;
  
      case "PrivacyPolicyPageTitle":
        verify_tabs_title();
        cy.url().should("include", "https://www.sabboura.com/privacy/");
        cy.go("back")
        break;
  
      case "TermsAndConditionsPageTitle":
        verify_tabs_title();
        cy.url().should("include", "https://www.sabboura.com/terms/");
        cy.go("back")
        break;
  
  }
});

When(/^check footer "(ContactUSTitle|PrivacyPolicyPageTitle|TermsAndConditionsPageTitle)"$/,(link) => {
  let links = get_value_by_key(link);

  function verify_tab_title() {
    cy.get("a").contains(links).click();
    cy.xpath("(//h1)[1]").then((title) => {
      const tempTitle = title.text();
      cy.log(tempTitle);
      expect(tempTitle.trim()).to.contains(links.trim());
    });
  }
  switch (link) {
    case "ContactUSTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/contact-us/");
      cy.go("back")
      break;

    case "PrivacyPolicyPageTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/privacy/");
      cy.go("back")
      break;

    case "TermsAndConditionsPageTitle":
      verify_tab_title();
      cy.url().should("include", "https://www.sabboura.com/terms/");
      cy.go("back")
      break;

    }});

