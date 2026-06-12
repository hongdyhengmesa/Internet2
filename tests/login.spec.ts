import {test, expect} from '@playwright/test';

test('login with valid credentials', async ({page}) =>{
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secrete_sauce');
    await page.getByRole('button', {name: /login/i}).click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();

});