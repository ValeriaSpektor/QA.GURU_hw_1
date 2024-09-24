export class ArticlePage {
    constructor(page) {
      this.page = page;
    }
  
    // Метод для перехода на страницу статьи
    async gotoArticle(title) {
      await this.page.getByRole('link', { name: title }).click();
    }
  
    // Метод для добавления комментария
    async addComment(comment) {
      await this.page.getByPlaceholder('Write a comment...').fill(comment);
      await this.page.getByRole('button', { name: 'Post Comment' }).click();
    }
  
    // Метод для проверки успешного добавления комментария
    async checkComment(comment) {
      await this.page.locator('.card-text', { hasText: comment }).waitFor();
    }
  
    // Метод для удаления статьи
    async deleteArticle() {
      await this.page.getByRole('button', { name: 'Delete Article' }).click();
    }
  
    // Метод для редактирования статьи
    async editArticle(newTitle, newDescription, newBody, newTags) {
      await this.page.getByRole('link', { name: 'Edit Article' }).click();
      await this.page.getByPlaceholder('Article Title').fill(newTitle);
      await this.page.getByPlaceholder('What\'s this article about?').fill(newDescription);
      await this.page.getByPlaceholder('Write your article (in').fill(newBody);
      await this.page.getByPlaceholder('Enter tags').fill(newTags);
      await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }
  }