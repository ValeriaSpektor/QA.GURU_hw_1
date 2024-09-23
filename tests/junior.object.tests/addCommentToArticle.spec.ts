import { test, expect } from '@playwright/test';

test('Add comment to article', async ({ page }) => {
  // Переход на сайт
  await page.goto('https://realworld.qa.guru/#/');

  // Переход к статье
  await page.getByRole('link', { name: 'Новая статья о ИИ Read more' }).click();

  // Переход к странице авторизации
  await page.getByRole('link', { name: 'Sign in' }).click();

  // Ввод логина
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');

  // Ввод пароля
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('542073vl');

  // Логин
  await page.getByRole('button', { name: 'Login' }).click();

  // Переход в глобальную ленту
  await page.getByRole('button', { name: 'Global Feed' }).click();

  // Открытие статьи
  await page.getByRole('link', { name: 'Новая статья о ИИ Read more' }).click();

  // Добавление комментария
  await page.getByPlaceholder('Write a comment...').click();
  await page.getByPlaceholder('Write a comment...').fill('Очень полезная публикация');

  // Отправка комментария
  await page.getByRole('button', { name: 'Post Comment' }).click();
});
