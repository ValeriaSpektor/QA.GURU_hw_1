export class ArticlePage {
  constructor(page) {
      this.page = page;
  }

  // Метод для перехода на страницу создания новой статьи
  async gotoNewArticlePage() {
      await this.page.getByRole('link', { name: 'New Article' }).click();
  }

  // Метод для создания новой статьи
  async createArticle(title, description, body, tags) {
      await this.page.getByPlaceholder('Article Title').fill(title);
      await this.page.getByPlaceholder('What\'s this article about?').fill(description);
      await this.page.getByPlaceholder('Write your article (in').fill(body);
      await this.page.getByPlaceholder('Enter tags').fill(tags);
      await this.page.getByRole('button', { name: 'Publish Article' }).click();
  }

  // Метод для редактирования статьи
  async editArticle(bodyUpdate) {
      await this.page.getByRole('link', { name: 'Edit Article' }).click();
      await this.page.getByPlaceholder('Write your article (in').fill(bodyUpdate);
      await this.page.getByRole('button', { name: 'Update Article' }).click();
  }

  // Метод для удаления статьи
  async deleteArticle() {
      await this.page.getByRole('button', { name: 'Delete Article' }).click();
  }
}
