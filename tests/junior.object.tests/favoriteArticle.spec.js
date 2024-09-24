const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { ArticlePage } = require('../../src/page.object.class/ArticlePage');

test.only('Favorite an article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  // Переход к странице и логин
  await loginPage.goto();
  await loginPage.clickLoginLink();
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Ожидание появления ссылки на статью и клик
  await page.goto('https://realworld.qa.guru/#/');
  await page.waitForSelector('text=ValeriaSeptember 23, 2024', { timeout: 10000 });
  await page.getByText('ValeriaSeptember 23, 2024').click();

  // Добавляем статью в избранное
  await articlePage.favoriteArticle();

  // Проверка, что статья в избранном
  await expect(page.locator('text=Favorited')).toBeVisible();
});
