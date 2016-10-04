import { HbBlogPage } from './app.po';

describe('hb-blog App', function() {
  let page: HbBlogPage;

  beforeEach(() => {
    page = new HbBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hb-blog works!');
  });
});
