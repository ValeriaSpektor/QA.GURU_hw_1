const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { LoginPage } = require('../../src/page.object.class/LoginPage.js');
const { ArticlePage } = require('../../src/page.object.class/ArticlePage.js');

const existedUser = {
    email: 'lapusik84@gmail.com',
    password: '542073vl'
};

test.describe('Junior Page Object Style: Article Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.doLogin(existedUser.email, existedUser.password);
        await loginPage.verifyLoginSuccess(existedUser.email);  // Проверяем, что email отображается после логина
    });

    test('Should create and delete an article', async ({ page }) => {
        const articlePage = new ArticlePage(page);

        // Переход на страницу создания новой статьи
        await articlePage.gotoNewArticlePage();

        // Создание статьи
        await articlePage.createArticle('Junior Title', 'Description', 'Article body', 'tag');

        // Проверка создания статьи
        await expect(page.locator('h1')).toHaveText('Junior Title');

        // Удаление статьи
        await articlePage.deleteArticle();

        // Проверка, что статья была удалена
        await expect(page.locator('text=Junior Title')).not.toBeVisible();
    });
});