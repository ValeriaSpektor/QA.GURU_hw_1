import { test, expect } from '@playwright/test';

test('Edit an article', async ({ page }) => {
  // Переход на сайт и авторизация
  await page.goto('https://realworld.qa.guru/#/');
  await page.getByRole('link', { name: /Login/ }).click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByPlaceholder('Password').press('Enter');
  await expect(page).toHaveURL(/realworld.qa.guru/);

  // Переход в глобальную ленту и открытие статьи
  await page.getByRole('button', { name: 'Global Feed' }).click();
  await page.getByRole('link', { name: /New Article about crossfit/ }).click();

  // Переход на страницу редактирования статьи
  await page.getByRole('link', { name: /Edit Article/ }).click();

  // Редактирование статьи
  await page.getByPlaceholder('What\'s this article about?').fill('Crossfit is my life');
  await page.getByPlaceholder('Write your article (in').fill('workout');
  await page.getByRole('button', { name: 'Update Article' }).click();

  // Проверка успешного обновления статьи
  await expect(page.getByText('Crossfit is my life')).toBeVisible();
});
