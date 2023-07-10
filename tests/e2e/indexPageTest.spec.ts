import { expect, test } from '@playwright/test';
import IndexPage from '../pages/indexPage';

test('index page has expected h1', async ({ page }) => {
	const indexPage = new IndexPage(page);

	await page.goto('/');
	await expect(indexPage.heading).toBeVisible();
});