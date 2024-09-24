const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { ArticlePage } = require('../../src/page.object.class/ArticlePage');

test.only('Delete an article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const articlePage = new ArticlePage(page);

  // Переход к странице и логин
  await loginPage.goto();
  await loginPage.clickLoginLink();
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Ожидание появления ссылки на статью и клик
  await page.waitForSelector('text=Новая статья о ИИ', { timeout: 10000 });
  await page.getByRole('link', { name: 'Новая статья о ИИ' }).click();

  // Удаление статьи
  await articlePage.deleteArticle();

  // Проверка, что статья была удалена
  await expect(page.locator('text=Новая статья о ИИ')).not.toBeVisible();
});
