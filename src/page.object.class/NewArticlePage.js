import { BasePage } from './base.class';

class NewArticlePage extends BasePage {
    constructor(page) {
        super(page);
        this.titleField = page.getByPlaceholder('Article Title');
        this.descriptionField = page.getByPlaceholder('What\'s this article about?');
        this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsField = page.getByPlaceholder('Enter tags');
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async goToNewArticle() {
        await this.page.goto('https://realworld.qa.guru/#/editor');
    }

    async fillArticleTitle(title) {
        await this.titleField.fill(title);
    }

    async fillArticleDescription(description) {
        await this.descriptionField.fill(description);
    }

    async fillArticleContent(content) {
        await this.bodyField.fill(content);
    }

    async fillArticleTag(tags) {
        await this.tagsField.fill(tags);
    }

    async publishArticle() {
        await this.publishButton.click();
    }

    async deleteArticle() {
        await this.page.getByRole('button', { name: 'Delete Article' }).click();
    }
}

export { NewArticlePage };
