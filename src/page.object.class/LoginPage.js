export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://realworld.qa.guru/#/');
  }

  async clickLoginLink() {
    // Заменяем непечатный символ на текстовый селектор
    await this.page.getByRole('link', { name: 'Login' }).click();
  }

  async login(email, password) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
