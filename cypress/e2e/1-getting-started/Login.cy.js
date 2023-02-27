/// <reference types="cypress" />

import { homePage } from "../../fixtures/Page Objects/Home"
import {loginForm} from "../../fixtures/Page Objects/Login"

describe("Login user with valid credentials", () => {

    it("Login user", () => {
        cy.viewport(1200,1200)
        cy.visit("https://cypress-api.vivifyscrum-stage.com/")
    homePage.loginBtn.click()
    cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/login").as("login")
    loginForm.loginUser("vukovic95@gmail.com", "taraba")
    cy.wait("@login").then((req) => {
        expect(req.response.statusCode).to.eql(200)
    })
    loginForm.emailInput.should('be.visible').and("have.value", "vukovic95@gmail.com")
    loginForm.passwordInput.should('be.visible')
    })
    
})