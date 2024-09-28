import { test, expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        await this.page.goto('https://realworld.qa.guru/#/');
    }

    async login(email, password) {
        await this.page.getByRole('link', { name: ' Login' }).click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

class ArticlePage {
    constructor(page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: ' New Article' });
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder('What\'s this article about?');
        this.bodyInput = page.getByPlaceholder('Write your article (in');
        this.tagsInput = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
        this.editArticleButton = page.getByRole('button', { name: 'Edit Article' }).first();
        this.updateButton = page.getByRole('button', { name: 'Update Article' });
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
    }

    async createArticle(title, description, body, tags) {
        await this.newArticleButton.click();
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        await this.tagsInput.fill(tags);
        await this.publishButton.click();
    }

    async goToArticle() {
        await this.page.waitForSelector('h1', { timeout: 60000 });
        await this.page.getByRole('heading', { name: 'Есть ли жизнь на Марсе' }).click();
    }

    async editArticle(newBody) {
        await this.editArticleButton.click();
        await this.bodyInput.fill(newBody);
        await this.updateButton.click();
    }

    async deleteArticle() {
        await this.deleteButton.click();
    }
}

class CommentPage {
    constructor(page) {
        this.page = page;
        this.commentInput = page.getByPlaceholder('Write a comment...');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    }

    async postComment(comment) {
        await this.commentInput.fill(comment);
        await this.postCommentButton.click();
    }
}

test.describe('Middle Page Object Style: Article Tests', () => {

    test('Create, edit, comment, and delete an article', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const articlePage = new ArticlePage(page);
        const commentPage = new CommentPage(page);

        // Логин
        await loginPage.open();
        await loginPage.login('lapusik84@gmail.com', '542073vl');

        // Создание статьи
        await articlePage.createArticle(
            'Есть ли жизнь на Марсе', 
            'Жизнь на Марсе', 
            'Хочу улететь в космос', 
            '#Mars'
        );

        // Переход на страницу статьи
        await articlePage.goToArticle();

        // Редактирование статьи
        await articlePage.editArticle('хочу в космос с тобой');

        // Добавление комментария
        await commentPage.postComment('Возьми меня с собой');

        // Переход на главную страницу
        await page.getByRole('link', { name: ' Home' }).click();

        // Нажимаем на вкладку "Global Feed"
        await page.getByRole('button', { name: 'Global Feed' }).click();

        // Переход на статью в глобальной ленте
        await page.getByRole('link', {
            name: 'Есть ли жизнь на Марсе Жизнь на Марсе Read more... #Mars'
        }).click();

        // Удаление статьи с использованием диалога
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
        });

        await articlePage.deleteArticle();

        // Ожидание возвращения на главную страницу
        await page.waitForLoadState('networkidle');
    });
});
