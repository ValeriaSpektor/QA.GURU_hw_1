class NewArticlePage {
  constructor(page) {
    this.page = page;
  }

  async gotoNewArticlePage() {
    await this.page.getByRole('link', { name: ' New Article' }).click();
  }

  async createArticle(title, description, body, tags) {
    await this.page.getByPlaceholder('Article Title').fill(title);
    await this.page.getByPlaceholder('What\'s this article about?').fill(description);
    await this.page.getByPlaceholder('Write your article (in').fill(body);
    await this.page.getByPlaceholder('Enter tags').fill(tags);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
  }
}

module.exports = { NewArticlePage };
