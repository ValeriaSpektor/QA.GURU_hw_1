import { test, expect } from '@playwright/test';

test('Favorite an Article', async ({ page }) => {
  // Переход на сайт и открытие статьи
  await page.goto('https://realworld.qa.guru/#/');
  await page.getByText('ValeriaSeptember 23, 2024').click();

  // Работа с диалогом
  page.once('dialog', dialog => {
    dialog.dismiss().catch(() => {});
  });

  // Добавление статьи в избранное и проверка диалога
  await page.getByRole('button', { name: /Favorite/ }).click();

  // Авторизация
  await page.getByRole('link', { name: /Login/ }).click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByRole('button', { name: 'Login' }).click();

  // Проверка успешного добавления в избранное
  await expect(page.getByText('Valeria')).toBeVisible();
});
