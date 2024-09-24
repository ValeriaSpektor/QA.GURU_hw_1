import { test, expect } from '@playwright/test';

test('Add comment to article', async ({ page }) => {
  // Переход на сайт
  await page.goto('https://realworld.qa.guru/#/');

  // Переход к статье
  await page.getByRole('link', { name: /Новая статья о ИИ/ }).click();

  // Переход к странице авторизации
  await page.getByRole('link', { name: 'Sign in' }).click();

  // Ввод логина и пароля
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByRole('button', { name: 'Login' }).click();

  // Проверка успешного логина
  await expect(page).toHaveURL(/realworld.qa.guru/);

  // Переход в глобальную ленту
  await page.getByRole('button', { name: 'Global Feed' }).click();

  // Открытие статьи и добавление комментария
  await page.getByRole('link', { name: /Новая статья о ИИ/ }).click();
  await page.getByPlaceholder('Write a comment...').fill('Очень полезная публикация');
  await page.getByRole('button', { name: 'Post Comment' }).click();

  // Проверка успешной отправки комментария
  await expect(page.getByText('Очень полезная публикация')).toBeVisible();
});
