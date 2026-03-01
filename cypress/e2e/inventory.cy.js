describe('Inventory Page', () => {
    beforeEach(() => {
        cy.loadCreds()
        cy.visit('/')
        cy.get('@creds').then(({ validUsername, password }) => {
            cy.loginWithCreds(validUsername, password)
        })
    })

    it('displays products', () => {
        cy.get('[data-test="inventory-container"]').should('be.visible')
        cy.get('.inventory_item').should('have.length.at.least', 1)
    })

    it('enables click on product', () => {
        cy.get('[data-test="inventory-item-name"]').first().click()
        cy.url().should('include', '/inventory-item')
    })

    it('back to product button returns to inventory', () => {
        cy.get('[data-test="inventory-item-name"]').first().click()
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', '/inventory')
    })

    it('adds items to cart', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('[data-test="inventory-item"]').eq(1).find('button').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')
    })

    it('removes from cart', () => {
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
        cy.get('[data-test="inventory-item"]').first().find('button').click()
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

    it('sorts products by price', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get()
            const sortedPrices = [...prices].sort((a, b) => a - b)
            expect(prices).to.deep.equal(sortedPrices)
        })
        
    })

    it('sorts products alphabetically', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        cy.get('.inventory_item_name').then(($names) => {
            const names = $names.map((index, html) => html.innerText).get()
            const sortedNames = [...names].sort()
            expect(names).to.deep.equal(sortedNames)
        })
    })
})