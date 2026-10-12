# SauceDemo | Playwright Web Automation

Web test automation project developed as part of **Activity 15** of the **Formação em Teste de Software e QA** at **[Iterasys](https://iterasys.com.br/) (Class 147)**.

The project demonstrates two approaches to automated testing using **Playwright and JavaScript**: generating a test with CodeGen and implementing a similar scenario manually.

## Project Overview

The goal is to automate a shopping flow on the [SauceDemo](https://www.saucedemo.com/), a demo e-commerce application featuring the fictional **Swag Labs** store.

The automated scenarios cover:

- User authentication
- Product selection and cart management
- Shopping cart validations
- Product removal
- Navigation to the first checkout step

Two test scripts were created using different products and implementation approaches.

**Scope:** Both tests stop at **Checkout: Your Information**, before entering customer details, reviewing the order, or completing the purchase.

## Tech Stack

- **JavaScript**: Test scripting language
- **Playwright**: End-to-end test automation framework
- **Node.js / npm**: Runtime and dependency management
- **Git / GitHub**: Version control
- **Loom**: Test demonstration recordings

## Testing Approach

The CodeGen test was generated using Playwright CodeGen, with minimal manual modifications. The manual test focuses on readability and more precise assertions.

| Aspect | CodeGen test | Manual test |
| --- | --- | --- |
| File | `tests/compra_produto_gen.spec.js` | `tests/compra_produto.spec.js` |
| Products | Sauce Labs Backpack ($29.99) and Sauce Labs Fleece Jacket ($49.99) | Sauce Labs Bike Light ($9.99) and Sauce Labs Bolt T-Shirt ($15.99) |
| Locators | CSS selectors using `page.locator()` | Primarily `getByTestId()`, with `filter()` to locate each cart item |
| Text assertions | `toContainText()` | `toHaveText()` for exact matches |
| Cart validations | Product names checked individually; prices and quantities checked against the entire cart list | Name, price, and quantity checked within each product's cart item |
| Removed product | Sauce Labs Fleece Jacket | Sauce Labs Bolt T-Shirt |
| Checks after removal | Updated cart badge | Removed item absent, remaining item visible, and updated cart badge |

**Shared test flow:**

1. Access the application and log in with valid credentials.
2. Validate the Products page.
3. Add two products, checking the cart badge after each addition.
4. Open the cart and validate product information.
5. Remove one product and check the updated cart.
6. Navigate to the first checkout step and validate its title.

## Key Improvements in Manual Scripting

Compared to the CodeGen-generated script, the manual implementation includes:

- **More readable locators:** Use of `getByTestId()` with Playwright configured to recognize SauceDemo's `data-test` attribute.
- **Simplified interactions:** Removal of unnecessary clicks before filling input fields.
- **Exact text assertions:** Use of `toHaveText()` instead of broader text containment checks.
- **Product-specific validations:** Use of `filter()` to identify individual products and validate their names, prices, and quantities.
- **Improved cart verification:** Assertions confirming both product removal and the visibility of the remaining item.
- **Better readability:** Comments organizing the main test steps.

## How to Run

**Prerequisites:**
- Node.js
- npm

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

Run all tests (Chromium, Firefox, and WebKit):

```bash
npx playwright test
```

**Other execution options:**

```bash
# Run tests only in Chromium
npx playwright test --project=chromium

# Run tests with visible browsers
npx playwright test --headed

# Run tests in interactive UI mode
npx playwright test --ui

# View the HTML test report
npx playwright show-report
```

## Key Learnings

This activity provided hands-on experience with both automatic test generation and manual test scripting.

While CodeGen simplifies the initial creation of automated tests, manual implementation offers greater control over locator strategies, code organization, and assertion accuracy.

The main takeaway is that **a passing test does not necessarily guarantee effective validation**. Assertions must verify the expected behavior accurately to reduce the risk of false positives.

For example, the CodeGen test uses `toContainText('1')` on the entire cart list to check quantity. That assertion can pass when the text appears elsewhere in the cart, even if the intended product has an incorrect quantity. The manual test scopes the assertion to the product's quantity element and uses `toHaveText('1')`, tying the expected value to the specific item.

## Demo Videos

The following recordings demonstrate the test implementations and executions.

- [CodeGen Test - Playwright Automation](https://www.loom.com/share/abe6c0ebdc874c8bb0ffb08dc265a269)
- [Manual Test - Playwright Automation](https://www.loom.com/share/1b9eb28c4b804be19b6adfe3d2467ca1)
