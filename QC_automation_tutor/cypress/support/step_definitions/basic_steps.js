import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
export { get_value_by_key,read_localization_file };
export { currentCode,currentText,currentDropdown,currentSearchDropdown,resource_file };

var current_local = Cypress.env("local");

var randomText = faker.name.findName();
var Code = faker.random.alphaNumeric(5);
var randomText2 = faker.name.findName();
var autoFirstName = faker.name.firstName();
var autoLastName = faker.name.lastName();
var autoEmail = faker.internet.email();
var autoPhoneNumber = faker.phone.phoneNumber("012########");
var Email = Cypress.env("mail")
var longTextRandom =faker.lorem.words(50) 

var currentFirstName = "";
var currentLastName = "";
var currentEmail = "";
var currentPhoneNumber = "";
var currentText = "";
var currentCode = "";
var currentDropdown="";
var currentSearchDropdown="";


var resource_file = read_localization_file(current_local);


When(/^[I ]*wait [for "]*(\d+)[ "]*[second]{3,7}$/, (seconds) => {
  cy.wait(seconds * 1000);
});

When(/^pause$/, () => {
  document.write('Press Enter to continue!')
  cy.pause()
})

When(/^go back$/, () => {
  cy.go("back");
});

When(/^refresh the page$/, () => {
  cy.reload();
});

When(/^scroll down$/, () => {
  // cy.scrollTo("bottom");
  cy.scrollTo('500px')
});

When(/^I fill the form with the following:$/, (dataTable) => {
  let data = dataTable.rawTable;
  let i;
  for (i of data) {
    fill_field_with(i);
  }
});


function fill_field_with(row) {
  const field = row[0];
  const type = row[1];
  const value = row[2];

  switch (type) {
    case "code":
      if (value === "randomCode") {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(Code);
        currentCode = Code;
      } else {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(value);
      }
      break;

    case "text":
      if (value == "randomText") {
        cy.log("randomText ", randomText);
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(randomText);
        currentText = randomText;
      } else {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(value);
      }
      break;

    case "longText":
      if (value == "longTextRandom") {
        cy.log("longTextRandom ", longTextRandom);
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(`${longTextRandom}`);
      } else { 
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(value);
      }
      break;
    case "firstName":
      if (value == "autoFirstName") {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(`${autoFirstName}`);
        currentFirstName = autoFirstName;
      } else {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(value);
      }
      break;
    case "lastName":
      if (value == "autoLastName") {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(`${autoLastName}`);
        currentLastName = autoLastName;
      } else {
        cy.get(`#${field}`).clear();
        cy.get(`#${field}`).type(value);
      }
      break;
    case "email":
      cy.get(`#${field}`).clear();
      cy.get(`#${field}`).type(`${autoEmail}`);
      currentEmail = autoEmail;
      break;
    case "phoneNumber":
      cy.get(`#${field}`).clear();
      cy.get(`#${field}`).type(`${autoPhoneNumber}`);
      currentPhoneNumber = autoPhoneNumber;
      break;

    case "dropdown":
      // cy.get(`#${field}`).select(`${value}`);
      cy.get(`#${field}`).select(Number(`${value}`));
      currentDropdown = value;
      break;

    case "search_dropdown":
      cy.xpath("(//*[@type='search'])[1]").click();
      cy.wait(2000);
      cy.xpath(`//li[contains(text(),'${value}')]`).click();
      break;
    
    case "multiple_select_dropdown":
      cy.get(`#${field}`).select([0,1], { force: true });
      cy.get('h3').first().click({ force: true },{ multiple: true });
      break;
  

    case "search_dropdown_byKey":
      cy.xpath("(//*[@type='search'])[1]").click({ multiple: true }, { force: true });
      cy.wait(2000);
      cy.xpath(`//li[contains(text(),'${get_value_by_key(value)}')]`).click();
      cy.get('h1').click()  //remove it after the dropdown in staff is designed correctly 
      break;

  }
}  

Then(/^I should see "([^"]*)" within the field "([^"]*)"$/, (text_key, field_xpath) => {
  var text_value = get_value_by_key(text_key);
  cy.xpath(field_xpath).then(($text) => {
    // expect(text_value).to.equal($text.text().replace(/\s+/g, ' ').trim())
    let expectedValue = (text_value).replace(/\s{1,}|[0-9]|[{|}]/g, ' ');
    let actualValue = ($text.text()).replace(/\s{1,}|[0-9]|[{|}]/g, ' ');
    expect((expectedValue).replace(/\s{1,}/g, ' ').trim()).to.equal((actualValue).replace(/\s{1,}/g, ' ').trim());

  });
}
);

Then(/^I verify the appearance of the success Msg "([^"]*)"$/, (text_key) => {
  var text_value = get_value_by_key(text_key)
  cy.xpath('//div[contains(@class,"alert alert-success visible") or @id="alert-success"]').contains(text_value).should('exist')
})


When(/^error message should contains message "([^"]*)"$/, (text_key) => {
  var text_value = get_value_by_key(text_key)
  // cy.get(".alert-error").invoke("text").should("contains", text_value);
  cy.xpath('//div[contains(@class,"alert-error visible") or @id="alert-errr"]').contains(text_value).should('exist')
  // cy.xpath(`//div[@class="alert alert-error visible" or @id="alert-errr"]`).contains(text_value)

});

Then(/^field "([^"]*)" (should|should not) have value "([^"]*)"$/, (field, vision, value) => {
  cy.get(`[id=${field}]`, { timeout: 10000 }).should(($input) => {
    if (vision === 'should') expect($input).to.have.value(value)
    if (vision === 'should not') expect($input).to.not.have.value(value)
  })
})


When(/^click on "([^"]*)" (link|button|tab|text|byXpath)$/, (element, field_type) => {
  if (field_type != 'byXpath'){
    var element_value = resource_file.data.find((e) => e.key === element).value
  }
  switch (field_type) {
    case "link":
      cy.get("a").contains(element_value).click({force : true});
      break;
    case "button":
      cy.get("button").contains(element_value).click()
      // cy.xpath(`//button[normalize-space(text()='${element_value}')]`).click({multiple: true},{force : true});
      break;
    case "tab":
      cy.get('h3').contains(element_value).click()
      break;
    case "text":
      cy.get('*').contains(element_value).click()
      break;
    case "byXpath":
      cy.xpath(element).click();
      break;
  }
});


Then(
  /^I verify the appearance of the report description "([^"]*)"$/,
  (text_key) => {
    var text_value = resource_file.data.find((e) => e.key === text_key).value;
    cy.xpath("//div[@class='section-content dev_checkBoxes']/p")
      .contains(text_value)
      .should("exist");
  }
);

When(/^the error message should be (visible|hidden)$/, (vision) => {
  if (vision == "visible") cy.get(".alert-error").should("be.visible");
  if (vision == "hidden") cy.get(".alert-error").should("not.be.visible");
});


Then(/^I verify the appearance of the report description "([^"]*)"$/, (text_key) => {
  var text_value = resource_file.data.find((e) => e.key === text_key).value;
  cy.xpath("//div[@class='section-content dev_checkBoxes']/p")
    .contains(text_value)
    .should("exist");
}
);


Then(/^I (verify|falsify) the appearance of "([^"]*)"$/, (vision, text_key) => {
  var text_value = get_value_by_key(text_key);
  cy.get("h1").then(($title) => {
    const temp = $title.text().split("[");
    let title = temp[0];
    if (vision === "verify") expect(text_value).to.equal(title.trim());
    if (vision === "falsify") expect(text_value).to.not.equal(title.trim());
  });
});

function read_localization_file(local) {
  var file = "";
  switch (local) {
    case "ar-EG":
      file = require("./resource_files/SharedResource_ar_EG.json");
      break;
    case "en-GB":
      file = require("./resource_files/SharedResource_en_GB.json");
      break;
    case "en-US":
      file = require("./resource_files/SharedResource_en_US.json");
      break;
    case "fr-FR":
      file = require("./resource_files/SharedResource_fr_FR.json");
      break;
  }
  return file;
}

function get_value_by_key(text_key) {
  var value = "";
  try {
    value = resource_file.data.find((e) => e.key === text_key).value;
  } catch (err) {
    value = text_key;
  }
  return value;
}
