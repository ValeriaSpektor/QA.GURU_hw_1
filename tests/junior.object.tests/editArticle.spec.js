import { test, expect } from '@playwright/test';

test('Edit an article', async ({ page }) => {
  // Переход на сайт
  await page.goto('https://realworld.qa.guru/#/');
  
  // Переход к странице авторизации
  await page.getByRole('link', { name: ' Login' }).click();

  // Ввод данных для авторизации
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByPlaceholder('Password').press('Enter');

  // Ожидание завершения авторизации и загрузки ленты
  await page.waitForLoadState('networkidle');

  // Переход на страницу глобальной ленты
  await page.getByRole('button', { name: 'Global Feed' }).click();

  // Ожидание загрузки глобальной ленты
  await page.waitForLoadState('networkidle');

  // Открытие статьи
  await page.getByRole('link', { name: 'New Article about crossfit' }).click();

  // Ожидание загрузки страницы статьи
  await page.waitForLoadState('networkidle');

  // Переход на страницу редактирования статьи
  await page.getByRole('link', { name: ' Edit Article' }).nth(1).click();

  // Ожидание загрузки страницы редактирования
  await page.waitForLoadState('networkidle');

  // Редактирование описания статьи
  await page.getByPlaceholder('What\'s this article about?').fill('Crossfit is my life');

  // Редактирование основного текста статьи
  await page.getByPlaceholder('Write your article (in').fill('workout');

  // Обновление статьи
  await page.getByRole('button', { name: 'Update Article' }).click();

  // Ожидание завершения обновления статьи
  await page.waitForLoadState('networkidle');
});
