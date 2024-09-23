import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  // Открыть главную страницу
  await page.goto('https://realworld.qa.guru/#/');
  
  // Переход на страницу авторизации
  await page.getByRole('link', { name: ' Login' }).click();
  
  // Заполнение формы логина
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('lapusik84@gmail.com');
  
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('542073vl');
  
  // Нажатие на кнопку логина
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Переход на страницу создания новой статьи
  await page.getByRole('link', { name: ' New Article' }).click();
  
  // Заполнение формы статьи
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill('Новая статья');
  
  await page.getByPlaceholder('What\'s this article about?').dblclick();
  await page.getByPlaceholder('What\'s this article about?').fill('о ИИ');
  
  await page.getByPlaceholder('Write your article (in').click();
  await page.getByPlaceholder('Write your article (in').fill('ИИ всегда помогает');
  
  await page.getByPlaceholder('Enter tags').click();
  await page.getByPlaceholder('Enter tags').fill('##AI');
  
  // Публикация статьи
  await page.getByRole('button', { name: 'Publish Article' }).click();
  
  // Проверка успешной публикации статьи (если есть какие-то ожидаемые элементы для проверки, можно добавить assert)
});
