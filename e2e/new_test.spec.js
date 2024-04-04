import { test, expect } from '@playwright/test';


test('Start page', async ({ page }) => {
  await page.goto('https://topface.com/');

  await expect(page).toHaveURL(/topface/);
 
  await page.locator('//button[@id="js-cookie-ok"]').click() // Close button cookie
  
  await page.locator('//button[contains(text(), "Log in with e-mail")]').click() // Click log in with e-mail

  await page.locator('//input[@id="form_auth_login"]').fill("accfortest@mail.ru") // Enter login
  await page.locator('//input[@id="form_auth_password"]').fill("Qwe1234") // Enter password

  await page.locator('//input[@id="form_auth_password"]').click() // click Sigh In

});
