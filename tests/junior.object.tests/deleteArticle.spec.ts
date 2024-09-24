import { test, expect } from '@playwright/test';

test('Create, comment, and delete an article', async ({ page }) => {
  // Авторизация
  await page.goto('https://realworld.qa.guru/#/');
  await page.getByRole('link', { name: /Login/ }).click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByPlaceholder('Password').press('Enter');

  // Создание статьи
  await page.getByRole('link', { name: /New Article/ }).click();
  await page.getByPlaceholder('Article Title').fill('New Article about crossfit');
  await page.getByPlaceholder('What\'s this article about?').fill('Crossfit as a lifestyle');
  await page.getByPlaceholder('Write your article (in').fill('I like doing sport');
  await page.getByPlaceholder('Enter tags').fill('#cross');
  await page.getByRole('button', { name: 'Publish Article' }).click();

  // Добавление комментария
  await page.getByPlaceholder('Write a comment...').fill('I like');
  await page.getByRole('button', { name: 'Post Comment' }).click();

  // Проверка комментария
  await expect(page.getByText('I like')).toBeVisible();

  // Удаление статьи
  await page.getByRole('button', { name: 'Delete Article' }).click();

  // Проверка удаления статьи
  await expect(page.getByText('New Article about crossfit')).not.toBeVisible();
});
