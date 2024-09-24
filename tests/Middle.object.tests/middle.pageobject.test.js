import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../../src/page.object.class/LoginPage.js';
import { NewArticlePage } from '../../src/page.object.class/ArticlePage.js'
import { MainPage } from '../../src/page.object.class/MainPage.js';

const existedUser = {
    email: 'lapusik84@gmail.com',
    password: '542073vl'
};

test.describe('Middle Page Object Style: Article Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.doLogin(existedUser.email, existedUser.password);
        await loginPage.verifyLoginSuccess(existedUser.email);
    });

    test('Create, favorite and delete article', async ({ page }) => {
        const articlePage = new NewArticlePage(page);
        const mainPage = new MainPage(page);

        const articleTitle = faker.lorem.words(3); // Генерируем случайное название
        const description = faker.lorem.sentence();
        const content = faker.lorem.paragraph();
        const tags = faker.lorem.word();

        // Создание статьи
        await articlePage.goToNewArticle();
        await articlePage.fillArticleTitle(articleTitle);
        await articlePage.fillArticleDescription(description);
        await articlePage.fillArticleContent(content);
        await articlePage.fillArticleTag(tags);
        await articlePage.publishArticle();

        // Проверка статьи
        await expect(page.locator('h1')).toHaveText(articleTitle);

        // Добавление статьи в избранное
        await mainPage.favoriteArticle(articleTitle);
        await expect(mainPage.articleIsFavorited(articleTitle)).toBeVisible();

        // Удаление статьи
        await articlePage.deleteArticle();
        await expect(page.locator(`text=${articleTitle}`)).not.toBeVisible();
    });
});
