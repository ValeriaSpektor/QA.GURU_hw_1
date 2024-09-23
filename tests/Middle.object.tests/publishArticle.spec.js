const { test } = require('@playwright/test');
const { LoginPage } = require('../../src/page.object.class/LoginPage');
const { NewArticlePage } = require('../../src/page.object.class/NewArticlePage');

test.only('Create and publish a new article', async ({ page }) => {
  // Инициализация Page Object классов
  const loginPage = new LoginPage(page);
  const newArticlePage = new NewArticlePage(page);

  // Открытие главной страницы и переход на страницу авторизации
  await loginPage.goto();
  await loginPage.clickLoginLink();

  // Ввод данных для входа и логин
  await loginPage.login('lapusik84@gmail.com', '542073vl');

  // Переход на страницу создания новой статьи
  await newArticlePage.gotoNewArticlePage();

  // Создание и публикация статьи
  await newArticlePage.createArticle(
    'Новая статья',
    'о ИИ',
    'ИИ всегда помогает',
    '##AI'
  );

});
