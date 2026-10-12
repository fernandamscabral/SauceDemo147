import { test, expect } from '@playwright/test';

test('Fluxo de Compra - CodeGen', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Products');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="cart-list"]')).toContainText('1');
  await expect(page.locator('[data-test="cart-list"]')).toContainText('$29.99');
  await expect(page.locator('[data-test="item-5-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="cart-list"]')).toContainText('1');
  await expect(page.locator('[data-test="cart-list"]')).toContainText('$49.99');
  await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
});