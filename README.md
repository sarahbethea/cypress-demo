# 🧪 Cypress E2E Demo – Sauce Demo

## Overview

This project demonstrates a simple end-to-end (E2E) test automation setup using Cypress.

The target application is [Sauce Demo](https://www.saucedemo.com), a public demo e-commerce site commonly used for automation practice.

The purpose of this project is to demonstrate understanding of:
* Writing basic E2E test flows
* Use stable selectors (data-test attributes)
* Avoid flaky test patterns 
* Demonstrate safe and clean environment variable handling
* Organizing tests in a maintainable structure
* Run tests locally and in GitHub Actions (CI)

This is intentionally a small, learning-oriented project, rather than a full production automation framework.



### Project Structure:
```
cypress/
  e2e/
    login.cy.js
    inventory.cy.js
    cart.cy.js
  support/
    commands.js
cypress.config.js
package.json
.github/workflows/cypress.yml
```



### Test Suites
* login.cy.js
    - Valid login
    - Invalid username
    - Invalid password
    - Locked out user
* inventory.cy.js
    - Inventory page loads after login
    - Products display
    - Add product to cart
* cart.cy.js
    - Add multiple items
    - Remove items
    - Cart badge updates correctly



### Environment Variable Handling
Credentials are loaded using Cypress’s environment variable system:
```
cy.env(['VALID_USERNAME', 'PASSWORD'])
```

Environment variables can be provided in two ways:
1. Create a cypress.env.json file (ignored by git):

```
{
  "VALID_USERNAME": "standard_user",
  "PASSWORD": "secret_sauce"
}
```

2. CI (GitHub Actions):
Secrets can be injected using:
* `CYPRESS_VALID_USERNAME`
* `CYPRESS_PASSWORD`



### Continuous Integration (GitHub Actions)
Tests run automatically on:
* Push
* Pull Request

CI performs:
1. Checkout repo
2. Install dependencies
3. Run Cypress headless
4. Upload screenshots/videos if tests fail

Artifacts are available for download in the GitHub Actions UI.