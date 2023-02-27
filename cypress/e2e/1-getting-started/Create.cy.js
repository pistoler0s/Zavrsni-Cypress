/// <reference types="cypress" />

import { createBoard } from "../../fixtures/Page Objects/Create"
import {homePage} from "../../fixtures/Page Objects/Home"
import {loginForm} from "../../fixtures/Page Objects/Login"
import {myOrganization} from "../../fixtures/Page Objects/Organization"


describe("Creating board", () => {

    it("Create", () => {
        cy.viewport(1200,1200)
        cy.visit("https://cypress-api.vivifyscrum-stage.com/")
        homePage.loginBtn.click()
        loginForm.loginUser("vukovic95@gmail.com", "taraba")
        cy.wait(5000)
        myOrganization.addNewBtn.eq(1).click({multiple: true})
        myOrganization.addBoardBtn.should("be.visible").click()
        cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/boards").as("addBoard")
        createBoard.createBoard("my board")
        cy.wait("@addBoard").then((req) => {
            expect(req.response.statusCode).to.eql(201)
            expect(req.response.body.status).to.eql("active")
        })
    })
})