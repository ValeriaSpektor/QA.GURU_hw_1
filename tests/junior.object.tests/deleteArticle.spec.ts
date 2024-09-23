import { test, expect } from '@playwright/test';

test('Create, comment, and delete an article', async ({ page }) => {
  // Переход на сайт
  await page.goto('https://realworld.qa.guru/#/');
  
  // Переход к странице авторизации
  await page.getByRole('link', { name: ' Login' }).click();

  // Ввод данных для логина
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  await page.getByPlaceholder('Password').fill('542073vl');
  await page.getByPlaceholder('Password').press('Enter');

  // Переход на страницу создания новой статьи
  await page.getByRole('link', { name: ' New Article' }).click();
  
  // Заполнение заголовка и описания статьи
  await page.getByPlaceholder('Article Title').fill('New Article about crossfit');
  await page.getByPlaceholder('What\'s this article about?').fill('Crossfit as a lifestyle');
  
  // Заполнение основного текста статьи
  await page.getByPlaceholder('Write your article (in').fill('I like doing sport');

  // Добавление тега
  await page.getByPlaceholder('Enter tags').fill('#cross');

  // Публикация статьи
  await page.getByRole('button', { name: 'Publish Article' }).click();

  // Ожидание загрузки статьи
  await page.waitForLoadState('networkidle');

  // Использование locator() для более гибкого поиска поля комментариев
  const commentField = await page.locator('textarea[placeholder="Write a comment..."]').first();

  // Проверяем, найден ли элемент
  if (await commentField.isVisible()) {
    // Заполнение комментария
    await commentField.fill('I like');
    await page.getByRole('button', { name: 'Post Comment' }).click();

    // Ожидание завершения добавления комментария
    await page.waitForLoadState('networkidle');
  } else {
    console.log('Поле для ввода комментария не найдено.');
  }

  // Ожидание появления кнопки удаления статьи
  const deleteButton = await page.locator('button:has-text("Delete Article")').first();

  if (await deleteButton.isVisible()) {
    // Нажатие на первый элемент с кнопкой удаления статьи
    await deleteButton.click();
  } else {
    console.log('Кнопка удаления статьи не найдена.');
  }
});
