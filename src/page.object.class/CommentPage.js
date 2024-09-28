class CommentPage {
    constructor(page) {
        this.page = page;
        this.commentInput = page.getByPlaceholder('Write a comment...');
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    }

    async postComment(comment) {
        await this.commentInput.fill(comment);
        await this.postCommentButton.click();
    }
}

export { CommentPage };
