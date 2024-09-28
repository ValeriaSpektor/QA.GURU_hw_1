class ArticlePage {
    constructor(page) {
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
        this.titleInput = page.getByPlaceholder('Article Title');
        this.descriptionInput = page.getByPlaceholder('What\'s this article about?');
        this.bodyInput = page.getByPlaceholder('Write your article (in');
        this.tagsInput = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
        this.updateButton = page.getByRole('button', { name: 'Update Article' });
        this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).nth(1);
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).nth(1);
    }

    async createArticle(title, description, body, tags) {
        await this.newArticleButton.click();
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        await this.tagsInput.fill(tags);
        await this.publishButton.click();
    }

    async editArticle(newBody) {
        await this.editArticleButton.click();
        await this.bodyInput.fill(newBody);
        await this.updateButton.click();
    }

    async deleteArticle() {
        await this.deleteButton.click();
    }
}

export { ArticlePage };
