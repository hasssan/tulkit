import { test, expect } from '@playwright/test';

test('Remove Punctuation', async ({ page }) => {
	await page.goto('/tulkit');
	await page.getByRole('link', { name: 'String To UPPERCASE,' }).click();
	await page.getByTestId('inputData').fill('1.000.000\n2.000.000');
	await page.getByTestId('Remove Punctuation').click();
	expect(await page.getByTestId('outputData').inputValue()).toBe('1000000\n2000000');
});
