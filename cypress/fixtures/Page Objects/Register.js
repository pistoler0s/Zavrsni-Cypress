class RegisterPage {


    get emailInput () {

        return cy.get ('[data-cy="sign-up-email-input"]')
}

get passwordInput(){

    return cy.get('[type="password"]')

}

get userNumber(){

    return cy.get('.el-input > [data-cy="sign-up-number-of-users-input"]')
}
}

export const registerPage = new RegisterPage()