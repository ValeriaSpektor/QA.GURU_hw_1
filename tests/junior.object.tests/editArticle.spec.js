const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { ArticlePage } = require('../../src/page.object.class/ArticlePage');

test('Edit an article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  // Переход на страницу логина и авторизация
  await loginPage.goto();
  await loginPage.clickLoginLink();
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Ждем, пока страница загрузится
  await page.waitForLoadState('networkidle');

  // Переход к статье
  await page.waitForSelector('text=New Article about crossfit');
  await page.getByRole('link', { name: 'New Article about crossfit' }).click();

  // Переход на страницу редактирования статьи
  await page.getByRole('link', { name: 'Edit Article' }).click();

  // Редактируем статью
  await articlePage.editArticle('Updated title', 'Updated description', 'Updated content', '##UpdatedTag');

  // Проверяем успешность редактирования
  await expect(page.locator('h1')).toHaveText('Updated title');
});
