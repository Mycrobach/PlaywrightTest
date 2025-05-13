import {test, expect} from '@playwright/test'

test ('Login to saucedemo', async ({page}) => {
  await page.goto ('https://www.saucedemo.com/v1/')
  await expect(page).toHaveURL ('https://www.saucedemo.com/v1/')

  await page.locator('#user-name').isVisible()
  await page.locator('#user-name').click()
  await page.locator('#user-name').fill('standard_user')
  await expect(page.locator('#user-name')).toHaveValue('standard_user')
  await page.locator('#password').click()
  await page.locator('#password').fill('secret_sauce')


})