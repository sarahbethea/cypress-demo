// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username, { log: false })
    cy.get('[data-test="password"]').type(password, { log: false })
    cy.get('[data-test="login-button"]').click()
})


Cypress.Commands.add('loadCreds', () => {
  return cy.env(['VALID_USERNAME', 'LOCKED_OUT_USERNAME', 'PASSWORD']).then((env) => {
    const creds = {
      validUsername: env.VALID_USERNAME ?? 'standard_user',
      lockedOutUsername: env.LOCKED_OUT_USERNAME ?? 'locked_out_user',
      password: env.PASSWORD ?? 'secret_sauce',
    }

    // Wrap the creds object and alias it for use in tests
    cy.wrap(creds, { log: false }).as('creds')
  })
})

Cypress.Commands.add('loginWithCreds', (username, password) => {
  cy.get('[data-test="username"]').clear().type(username, { log: false })
  cy.get('[data-test="password"]').clear().type(password, { log: false })
  cy.get('[data-test="login-button"]').click()
})