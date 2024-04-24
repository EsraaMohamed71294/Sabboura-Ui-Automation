import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { get_value_by_key } from "./basic_steps";
export { GradeTitle ,studentGroupTitle };
var studentGroupTitle = "";
var GradeTitle = "";
When(/^verify (code|name|grade) validation error Msg "([^"]*)"$/, (field_name, text_key) => {
    var text_value = get_value_by_key(text_key)
    if (field_name == "code") cy.xpath('//*[@id="classroomcode-error"]').contains(text_value).should('exist')
    if (field_name == "name") cy.xpath('//*[@id="classroomname-error"]').contains(text_value).should('exist')
    if (field_name == "grade") cy.xpath('//*[@id="selectGrade-error"]').contains(text_value).should('exist')

});

When (/^click on 3 dots of student group$/,()=>{
    cy.xpath("((//div[@class='section-content'])[1]//h3)[1]").then(($studentGroupName) => {
         studentGroupTitle = $studentGroupName.text().trim();
    })
    cy.xpath("(//div[@class='section-content'])[1]/..//div[@class='section-title']").then(($GradeName)=>{
         GradeTitle = $GradeName.text().trim();
    })
    cy.xpath("(//*[@class='btn btn-white icon dropdown-toggle'])[1]").click()
 });


 When (/^check Grade and studentGroup names of student$/,()=>{
    cy.xpath("//*[@id='ClassroomId']//option[2]").then(($studentGroup) => {
        let title =$studentGroup.text().trim()
        expect(title).to.equal(studentGroupTitle)
    })
    cy.xpath("//*[@id='GradeID']//option[2]").then(($Grade) => {
        let nameOfGrade =$Grade.text().trim()
        expect(nameOfGrade).to.equal(GradeTitle)
        
    })
});

When (/^check grade feild is disabled$/,()=>{
    cy.get('#selectGrade-edit').should("have.attr", "disabled")
});