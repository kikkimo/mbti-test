import { test, expect } from '@playwright/test';

test.describe('MBTI Test Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home page loads correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('MBTI 人格测试');
    await expect(page.locator('text=开始测试')).toBeVisible();
  });

  test('Start test navigation', async ({ page }) => {
    await page.click('text=开始测试');
    await expect(page).toHaveURL('/test');
    await expect(page.locator('text=Question 1 of 144')).toBeVisible();
  });

  test('Answer questions and navigate', async ({ page }) => {
    await page.click('text=开始测试');

    // Answer first question
    const firstOption = page.locator('button').filter({ hasText: /非常|比较|偏向/ }).first();
    await firstOption.click();

    // Wait for auto-advance or manually advance
    await page.waitForTimeout(500);

    // Check progress
    await expect(page.locator('text=/answered.*1.*144/')).toBeVisible();

    // Navigate back
    await page.click('text=Previous');
    await expect(page.locator('text=Question 1 of 144')).toBeVisible();
  });

  test('Complete test flow', async ({ page }) => {
    await page.click('text=开始测试');

    // Answer a few questions quickly
    for (let i = 0; i < 3; i++) {
      const option = page.locator('button').filter({ hasText: /非常|比较|偏向/ }).first();
      await option.click();
      await page.waitForTimeout(400);
    }

    // Check answers are tracked
    const answerCount = page.locator('text=/answered.*[2-9].*144/');
    await expect(answerCount).toBeVisible();
  });

  test('Question indicators work', async ({ page }) => {
    await page.click('text=开始测试');

    // Click on a question indicator dot
    const dots = page.locator('.w-3.h-3.rounded-full');
    const lastDot = dots.nth(10);
    await lastDot.click();

    // Should navigate to that question
    await expect(page.locator('text=/Question 1[12] of 144/')).toBeVisible();
  });

  test('Result page displays correctly', async ({ page }) => {
    // Set test answers in session storage
    await page.goto('/');

    // Simulate completing test by setting sessionStorage
    await page.evaluate(() => {
      const answers = {
        'ei-001': 2,
        'sn-001': -2,
        'tf-001': 1,
        'jp-001': -1,
      };
      sessionStorage.setItem('mbti-answers', JSON.stringify(answers));
    });

    await page.goto('/result');

    // Check result page elements
    await expect(page.locator('text=/维度分析/')).toBeVisible();
    await expect(page.locator('text=/分享与导出/')).toBeVisible();
  });
});

test.describe('Result Page', () => {
  test('Displays all components', async ({ page }) => {
    // Set complete answers
    await page.evaluate(() => {
      const answers = {};
      for (let i = 1; i <= 144; i++) {
        const dim = i <= 36 ? 'ei' : i <= 72 ? 'sn' : i <= 108 ? 'tf' : 'jp';
        const num = String(i - 1).padStart(3, '0');
        answers[`${dim}-${num}`] = i % 3 - 1; // -1, 0, or 1
      }
      sessionStorage.setItem('mbti-answers', JSON.stringify(answers));
    });

    await page.goto('/result');

    // Check for personality report
    await expect(page.locator('h2').first()).toBeVisible();

    // Check for dimension chart
    await expect(page.locator('text=维度分析')).toBeVisible();

    // Check for share card
    await expect(page.locator('text=分享与导出')).toBeVisible();
  });

  test('Share functionality works', async ({ page }) => {
    await page.evaluate(() => {
      sessionStorage.setItem('mbti-answers', JSON.stringify({
        'ei-001': 1,
        'sn-001': -1,
        'tf-001': 1,
        'jp-001': -1,
      }));
    });

    await page.goto('/result');

    // Click copy link button
    const copyButton = page.locator('button').filter({ hasText: '复制分享链接' });
    await copyButton.click();

    // Check for success modal
    await expect(page.locator('text=链接已复制')).toBeVisible();
    await expect(page.locator('text=分享链接已复制到剪贴板')).toBeVisible();
  });
});

test.describe('Share Page', () => {
  test('Shows error for invalid share ID', async ({ page }) => {
    await page.goto('/share/invalid123');
    await expect(page.locator('text=链接无效或已过期')).toBeVisible();
    await expect(page.locator('text=返回首页')).toBeVisible();
  });

  test('Navigates to home from error page', async ({ page }) => {
    await page.goto('/share/invalid123');
    await page.click('text=返回首页');
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=开始测试')).toBeVisible();
  });
});
