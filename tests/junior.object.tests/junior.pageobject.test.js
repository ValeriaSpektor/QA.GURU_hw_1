import { test, expect } from '@playwright/test';

test.describe('Junior Page Object Style: Article Tests', () => {

    test('Create, edit, comment, and delete an article', async ({ page }) => {
        // Логин
        await page.goto('https://realworld.qa.guru/#/');
        await page.getByRole('link', { name: ' Login' }).click();
        await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
        await page.getByPlaceholder('Password').fill('542073vl');
        await page.getByRole('button', { name: 'Login' }).click();
        
        // Создание статьи
        await page.getByRole('link', { name: ' New Article' }).click();
        await page.getByPlaceholder('Article Title').fill('Есть ли жизнь на Марсе');
        await page.getByPlaceholder('What\'s this article about?').fill('Жизнь на Марсе');
        await page.getByPlaceholder('Write your article (in').fill('Хочу улететь в космос');
        await page.getByPlaceholder('Enter tags').fill('#Mars');
        
        // Публикация статьи
        await page.getByRole('button', { name: 'Publish Article' }).click();
        await page.waitForLoadState('networkidle');

        // Переход на страницу статьи
        await page.waitForSelector('h1', { timeout: 60000 });
        await page.getByRole('heading', { name: 'Есть ли жизнь на Марсе' }).click();

        // Редактирование статьи
        await page.getByRole('button', { name: 'Edit Article' }).first().click();
        await page.getByPlaceholder('Write your article (in').click();
        await page.getByPlaceholder('Write your article (in').fill('хочу в космос с тобой');
        
        // Обновление статьи
        await page.getByRole('button', { name: 'Update Article' }).click();

        // Добавление комментария
        await page.getByPlaceholder('Write a comment...').click();
        await page.getByPlaceholder('Write a comment...').fill('Возьми меня с собой');
        await page.getByRole('button', { name: 'Post Comment' }).click();

        // Переход на главную страницу
        await page.getByRole('link', { name: ' Home' }).click();

        // Нажимаем на вкладку "Global Feed"
        await page.getByRole('button', { name: 'Global Feed' }).click();

        // Переход на статью в глобальной ленте
        await page.getByRole('link', { name: 'Есть ли жизнь на Марсе Жизнь на Марсе Read more... #Mars' }).click();

        // Удаление статьи с использованием .first()
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
        });

        // Нажатие на первый элемент кнопки удаления статьи
        await page.getByRole('button', { name: 'Delete Article' }).first().click();

        // Ожидание возвращения на главную страницу
        await page.waitForLoadState('networkidle');
    });
});
