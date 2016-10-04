export class HbBlogPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hb-blog-app h1')).getText();
  }
}
