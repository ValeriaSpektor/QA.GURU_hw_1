import { test, expect } from '@playwright/test';

test.only('Create and publish a new article', async ({ page }) => {
  // Открыть главную страницу
  await page.goto('https://realworld.qa.guru/#/');

  // Переход на страницу авторизации и вход
  await page.getByRole('link', { name: /Login/ }).click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByRole('button', { name: 'Login' }).click();

  // Переход на страницу создания новой статьи
  await page.getByRole('link', { name: /New Article/ }).click();

  // Заполнение формы новой статьи и публикация
  await page.getByPlaceholder('Article Title').fill('Новая статья');
  await page.getByPlaceholder('What\'s this article about?').fill('о ИИ');
  await page.getByPlaceholder('Write your article (in').fill('ИИ всегда помогает');
  await page.getByPlaceholder('Enter tags').fill('#AI');
  await page.getByRole('button', { name: 'Publish Article' }).click();

  // Проверка успешной публикации статьи
  await expect(page.getByText('Новая статья')).toBeVisible();
});
