export class ArticlePage {
  constructor(page) {
      this.page = page;
  }

  async gotoNewArticlePage() {
      await this.page.getByRole('link', { name: 'New Article' }).click();
  }
}
