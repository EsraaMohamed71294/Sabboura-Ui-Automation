import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import {read_localization_file} from './basic_steps'
var current_local = Cypress.env("local");

Given(/^navigate to sabboura website$/, () => {
    cy.visit(Cypress.config().baseUrl)
})

// inserting the mail and password credentials
When(/^login with valid credentials$/, () => {
    var mail = ''
    var password = '123456'
    switch(current_local){
        case 'ar-EG' :
          mail = 'gedab58645@vysolar.com' 
        break;
        case 'fr-FR' :
           mail = 'tonefi8327@specialistblog.com'
        break;
        default:
        mail = 'Automation_tutors@sabboura.com'

    }
    cy.get('#username').type(mail)
    cy.get('#btn-verify').click()
    cy.wait(2000)
    cy.get('#password').type(password)
    cy.get('#btn-verify').click()
    cy.wait(2000)
})

When(/^change language to other "(frist|second)" languages$/, (other_language_case)=> {
    cy.get('#SelectedLanguage').click()
     var local =''
    switch(current_local){
        case 'ar-EG' :
           if(other_language_case ==  "frist")
           {
            cy.get('a').contains("Français").click()
            local = 'fr-FR'
           }
           else
           {
            cy.get('a').contains("English").click()
            local = 'en-GB'
           }
            break; 
        case 'fr-FR' :
           if(other_language_case ==  "frist")
           {
            cy.get('a').contains("English").click()
            local = 'en-GB'
           }
           else
           {
            cy.get('a').contains("العربية").click()
            local = 'ar-EG'
           }
            break; 
        default:
            
            if(other_language_case ==  "frist")
           {
            cy.get('a').contains("Français").click()
            local = 'fr-FR'
           }
           else
           {
            cy.get('a').contains("العربية").click()
            local = 'ar-EG'
           }
  
    }
  cy.log(local)
  resource_file = read_localization_file(local)
  })
  
  


