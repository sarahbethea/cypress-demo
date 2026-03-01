describe('Login Flow', () => {
    let validUsername
    let lockedOutUsername
    let password
    const invalidUsername = 'invalid_user'
    const invalidPassword = 'pw'
    before(() => {
        return cy.env(['VALID_USERNAME', 'LOCKED_OUT_USERNAME', 'PASSWORD']).then(({ VALID_USERNAME, LOCKED_OUT_USERNAME, PASSWORD }) => {
            validUsername = VALID_USERNAME || 'standard_user'
            lockedOutUsername = LOCKED_OUT_USERNAME || 'locked_out_user'
            password = PASSWORD || 'secret_sauce'
        })
    })

    beforeEach(() => {
        cy.visit('/')
    })

    it('successful login with valid credentials', () => {
        cy.login(validUsername, password)
        // assert that app moved into the "logged in" state
        cy.url().should('include', '/inventory')
        cy.get('[data-test="inventory-container"]').should('be.visible')

    })

    it('shows error for invalid username', () => {
        cy.login(invalidUsername, password)
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Username and password do not match any user in this service')

    })

    it('shows error with invalid password', () => {
        cy.login(validUsername, invalidPassword)
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Username and password do not match any user in this service')

    })

    it('shows correct error message for locked out user', () => {
        cy.login(lockedOutUsername, password)
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Sorry, this user has been locked out.')

    })

})