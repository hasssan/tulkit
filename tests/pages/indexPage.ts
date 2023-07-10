import type { Locator, Page } from "@playwright/test";

export default class IndexPage{
  page: Page;
  heading: Locator;

  constructor(page: Page){
    this.page = page;
    this.heading = this.page.getByRole('heading', { name: 'Tulkit' })
  }
}