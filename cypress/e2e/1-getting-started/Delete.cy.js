/// <reference types="cypress" />

import { createBoard } from "../../fixtures/Page Objects/Create"
import {homePage} from "../../fixtures/Page Objects/Home"
import {loginForm} from "../../fixtures/Page Objects/Login"
import {myOrganization} from "../../fixtures/Page Objects/Organization"

describe("Adding and deleting board that we made", () => {

let boardId = null;

    it("Adding and deleting board", () => {
        cy.viewport(1200,1200)
        cy.visit("https://cypress-api.vivifyscrum-stage.com/")
    homePage.loginBtn.click()
    loginForm.loginUser("vukovic95@gmail.com", "taraba")
    myOrganization.addNewBtn.eq(1).click({multiple: true})
    myOrganization.addBoardBtn.should("be.visible").click()
    cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/boards").as("addBoard")
    createBoard.createBoard("my board")
    cy.wait("@addBoard").then((req) => {
        expect(req.response.statusCode).to.eql(201)
       boardId = req.response.body.id
       console.log(boardId)
    })
    })

    it("Deleting board", () => {
        cy.visit(`https://cypress.vivifyscrum-stage.com/boards/${boardId}/settings`)
        loginForm.loginUser("vukovic95@gmail.com", "taraba")
        cy.wait(6000)
        cy.intercept("DELETE", `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`).as("deleteBoard")
        homePage.deleteBtn.click().should("be.visible")
        homePage.confirmDeleteBtn.should("be.visible").click()
        cy.wait("@deleteBoard").then((req) => {
            expect(req.response.statusCode).to.eql(200)
        })
    })


})