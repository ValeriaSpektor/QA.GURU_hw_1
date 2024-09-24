const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { ArticlePage } = require('../../src/page.object.class/ArticlePage');

test.only('Add comment to an article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  // Переход к странице и логин
  await loginPage.goto();
  await loginPage.clickLoginLink();
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Ожидание появления ссылки на статью и клик
  await page.waitForSelector('text=Новая статья о ИИ', { timeout: 10000 });
  await page.getByRole('link', { name: 'Новая статья о ИИ' }).click();

  // Добавление комментария
  await page.getByPlaceholder('Write a comment...').fill('I like this article');
  await page.getByRole('button', { name: 'Post Comment' }).click();

  // Проверка комментария
  await expect(page.locator('text=I like this article')).toBeVisible();
});
