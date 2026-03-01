describe('Cart Functionality', () => {
    beforeEach(() => {
        cy.loadCreds()
        cy.visit('/')
        cy.get('@creds').then(({ validUsername, password }) => {
            cy.loginWithCreds(validUsername, password)
        })
    })
    
    it('displays items in cart', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 1)
    })

    it('removes items from cart', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 1)
        cy.get('.cart_item').first().find('button').click()
        cy.get('.cart_item').should('have.length', 0)
    })

    it('proceeds to checkout', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one')
    })

    it('displays correct item details in cart', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').first().within(() => {
            cy.get('.inventory_item_name').should('be.visible')
            cy.get('.inventory_item_price').should('be.visible')
        })
    })  

})