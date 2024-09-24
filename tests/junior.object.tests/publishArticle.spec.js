const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { NewArticlePage } = require('../../src/page.object.class/NewArticlePage');

test.only('Create and publish a new article', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const newArticlePage = new NewArticlePage(page);

  // Переход к странице и логин
  await loginPage.goto();
  await loginPage.clickLoginLink();
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Переход на страницу создания новой статьи
  await newArticlePage.gotoNewArticlePage();

  // Создание статьи
  await newArticlePage.createArticle('Новая статья', 'о ИИ', 'ИИ всегда помогает', '##AI');

  // Ожидание завершения публикации
  await page.waitForURL(/.*\/article\/.*/, { timeout: 10000 });

  // Проверка успешной публикации статьи
  await expect(page.locator('h1')).toHaveText('Новая статья', { timeout: 20000 });
});
