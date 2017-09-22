import { UkelelePage } from './app.po';

describe('ukelele App', () => {
  let page: UkelelePage;

  beforeEach(() => {
    page = new UkelelePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
