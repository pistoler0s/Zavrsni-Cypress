/// <reference types="cypress" />
import { registerPage } from "../../fixtures/Page Objects/Register"
describe("Register Test", () => {
    it('Registration ', () => {
        cy.visit("https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=2&event=page-card/")

        cy.get('[data-cy="sign-up-email-input"]').type("vukovic95@gmail.com")
        cy.get('[type="password"]').type("taraba")
        cy.get('.el-input > [data-cy="sign-up-number-of-users-input"]').type(33)
        
        cy.get('[data-cy="sign-up-submit-button"]').click()
        
})
})