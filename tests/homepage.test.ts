import { expect, test } from '@playwright/test';

test('site title rendered', async ({ page }) => {
	await page.goto('/tulkit/');
	await expect(page.getByRole('heading', { name: 'Tulkit' })).toBeVisible();
});
