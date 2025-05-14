import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Tests', () => {
  const baseUrl = 'https://www.saucedemo.com/v1/index.html';
  const usernames = [
    { username: 'standard_user', shouldLogin: true },
    { username: 'locked_out_user', shouldLogin: false },
    { username: 'problem_user', shouldLogin: true },
    { username: 'performance_glitch_user', shouldLogin: true },
  ];

  usernames.forEach(({ username, shouldLogin }) => {
    test(`Login test for ${username}`, async ({ page }) => {
      // Navigate to the SauceDemo login page
      await page.goto(baseUrl);

      // Enter username and password
      await page.fill('#user-name', username);
      await page.fill('#password', 'secret_sauce');

      // Click the login button
      await page.click('#login-button');

      if (shouldLogin) {
        // Verify redirection to the inventory page
        await expect(page).toHaveURL(/inventory.html/);

        // Click the menu button and log out
        await page.click("div[class='bm-burger-button'] button");
        await page.click('#logout_sidebar_link');

        // Verify redirection back to the login page
        await expect(page).toHaveURL(baseUrl);
      } else {
        // Verify error message for locked_out_user
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
      }
    });
  });
});