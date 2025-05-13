import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Tests', () => {
  test('Valid Login', async ({ page }) => {
    // Navigate to the SauceDemo login page
    await page.goto('https://www.saucedemo.com/v1/');

    // Input valid username and password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    // Click the login button
    await page.click('#login-button');

    // Verify successful login by checking the presence of the inventory page
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Login and logout scenario on SauceDemo', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/v1/');

    // Enter username and password
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');

    // Click the login button
    await page.click('#login-button');

    // Verify successful login by checking the presence of the burger menu
    await page.waitForSelector("div[class='bm-burger-button'] button", { state: 'visible' });
    await expect(page.locator("div[class='bm-burger-button'] button")).toBeVisible();

    // Click the burger menu button
    await page.click(("div[class='bm-burger-button'] button"));

    // Click the logout link
    await page.click('#logout_sidebar_link');

    // Verify successful logout by checking the presence of the login button
    await expect(page.locator('#login-button')).toBeVisible();
  });
});