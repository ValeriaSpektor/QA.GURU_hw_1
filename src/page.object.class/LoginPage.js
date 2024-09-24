export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://realworld.qa.guru/#/login');
    }

    async doLogin(email, password) {
        await this.page.getByPlaceholder('Email').fill(email);
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async verifyLoginSuccess(email) {
        // Теперь проверяем появление текста email на странице после успешного логина
        await this.page.waitForSelector(`text=${email}`, { timeout: 15000 });
    }
}