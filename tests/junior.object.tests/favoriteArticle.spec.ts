import { test, expect } from '@playwright/test';

test('Favorite an Article', async ({ page }) => {
  // Переход на сайт
  await page.goto('https://realworld.qa.guru/#/');

  // Переход к статье
  await page.getByText('ValeriaSeptember 23, 2024 ( 0 )Новая статьяо ИИRead more...##AI').click();

  // Работа с диалогом (если возникает)
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Попытка добавить статью в избранное до логина (сработает диалог)
  await page.getByRole('button', { name: ' Favorite ( 0 )' }).nth(1).click();

  // Переход к авторизации
  await page.getByRole('link', { name: ' Login' }).click();

  // Ввод данных для логина
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('542073vl');

  // Логин
  await page.getByRole('button', { name: 'Login' }).click();

  // Возвращение к глобальной ленте
  await page.getByRole('button', { name: 'Global Feed' }).click();

  // Открытие другой статьи
  await page.getByText('LynneSeptember 21, 2024 ( 0 )Bene coadunatio sophismata adeptio adsuesco abeo').click();

  // Добавление статьи в избранное
  await page.getByRole('button', { name: ' Favorite ( 0 )' }).nth(1).click();
});
