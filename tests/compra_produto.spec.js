import { test, expect } from '@playwright/test'

test('Fluxo de Compra - Script Manual', async ({ page }) => {

  // Acessar o site e realizar login
  await page.goto('https://www.saucedemo.com/')
  await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();

  await page.getByTestId('username').fill('standard_user')
  await page.getByTestId('password').fill('secret_sauce')
  await page.getByTestId('login-button').click()

  // Validar a página de produtos
  await expect(page.getByTestId('title')).toHaveText('Products')

  // Adicionar dois produtos ao carrinho
  await page.getByTestId('add-to-cart-sauce-labs-bike-light').click()
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1')

  await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2')

  // Acessar o carrinho
  await page.getByTestId('shopping-cart-link').click()
  await expect(page.getByTestId('title')).toHaveText('Your Cart')

  // Localizar os produtos individualmente no carrinho
  const bikeLight = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bike Light' })

  const boltTShirt = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Bolt T-Shirt' })

  // Validar nome, preço e quantidade de cada produto
  await expect(bikeLight.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Bike Light')
  await expect(bikeLight.getByTestId('inventory-item-price')).toHaveText('$9.99')
  await expect(bikeLight.getByTestId('item-quantity')).toHaveText('1')

  await expect(boltTShirt.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Bolt T-Shirt')
  await expect(boltTShirt.getByTestId('inventory-item-price')).toHaveText('$15.99')
  await expect(boltTShirt.getByTestId('item-quantity')).toHaveText('1')

  // Remover a camiseta do carrinho
  await page.getByTestId('remove-sauce-labs-bolt-t-shirt').click()

  // Validar a remoção e a permanência do outro produto
  await expect(boltTShirt).toHaveCount(0)
  await expect(bikeLight).toBeVisible()
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1')

  // Avançar até a primeira etapa do checkout
  await page.getByTestId('checkout').click()
  await expect(page.getByTestId('title')).toHaveText('Checkout: Your Information')
})
