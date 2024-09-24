export class MainPage {
    constructor(page) {
      this.page = page;
    }
  
    // Метод для добавления статьи в избранное
    async favoriteArticle(articleTitle) {
      await this.page.waitForSelector(`text=${articleTitle}`);
      await this.page.getByRole('button', { name: 'Favorite Article' }).click();
    }
  
    // Метод для проверки, что статья добавлена в избранное
    async articleIsFavorited(articleTitle) {
      return await this.page.locator(`text=${articleTitle}`).getByRole('button', { name: 'Favorited' });
    }
  
    // Переход на глобальный фид
    async goToGlobalFeed() {
      await this.page.getByRole('button', { name: 'Global Feed' }).click();
    }
  
    // Открытие первой статьи на главной странице
    async openFirstArticle() {
      await this.page.getByRole('link').first().click();
    }
  }
  