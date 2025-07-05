import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration?: number;
  error?: string;
}

@Component({
  selector: 'app-playwright',
  imports: [CommonModule, FormsModule],
  templateUrl: './playwright.component.html',
  styleUrl: './playwright.component.scss'
})
export class PlaywrightComponent implements OnInit {
  testResults: TestResult[] = [];
  isRunningTests = false;
  selectedBrowser = 'chromium';
  sampleTestCode = `import { test, expect } from '@playwright/test';

test.describe('Sample Test Suite', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Angular/);
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('#sidebar')).toBeVisible();
  });
});`;

  playwrightFeatures = [
    {
      title: 'Cross-browser Testing',
      description: 'Test across Chromium, Firefox, and WebKit browsers',
      icon: '🌐'
    },
    {
      title: 'Auto-wait',
      description: 'Playwright automatically waits for elements to be actionable',
      icon: '⏱️'
    },
    {
      title: 'Network Interception',
      description: 'Mock API responses and test offline scenarios',
      icon: '🔗'
    },
    {
      title: 'Screenshots & Videos',
      description: 'Capture screenshots and videos of test failures',
      icon: '📸'
    },
    {
      title: 'Parallel Testing',
      description: 'Run tests in parallel for faster execution',
      icon: '🚀'
    },
    {
      title: 'Trace Viewer',
      description: 'Debug tests with detailed trace viewer',
      icon: '🔍'
    }
  ];

  bestPractices = [
    'Use data-testid attributes for reliable element selection',
    'Create reusable page object models',
    'Use explicit waits instead of arbitrary sleep',
    'Mock external dependencies and APIs',
    'Run tests in headless mode for CI/CD',
    'Use screenshot comparisons for visual testing'
  ];

  ngOnInit() {
    this.loadSampleTestResults();
  }

  runTests() {
    this.isRunningTests = true;
    this.testResults = [];

    // Simulate running tests
    const testNames = [
      'Home page loads correctly',
      'Navigation works properly',
      'Form submission succeeds',
      'Error handling works',
      'Responsive design check'
    ];

    testNames.forEach((testName, index) => {
      setTimeout(() => {
        this.testResults.push({
          name: testName,
          status: 'running'
        });
      }, index * 500);

      setTimeout(() => {
        const result = this.testResults.find(t => t.name === testName);
        if (result) {
          result.status = Math.random() > 0.2 ? 'passed' : 'failed';
          result.duration = Math.floor(Math.random() * 3000) + 500;
          if (result.status === 'failed') {
            result.error = 'Element not found: [data-testid="submit-button"]';
          }
        }
      }, (index + 1) * 1000);
    });

    setTimeout(() => {
      this.isRunningTests = false;
    }, testNames.length * 1000 + 500);
  }

  private loadSampleTestResults() {
    this.testResults = [
      { name: 'App initialization', status: 'passed', duration: 1200 },
      { name: 'Routing functionality', status: 'passed', duration: 800 },
      { name: 'Component rendering', status: 'failed', duration: 1500, error: 'Expected element to be visible' },
      { name: 'Form validation', status: 'passed', duration: 900 },
      { name: 'API integration', status: 'passed', duration: 2100 }
    ];
  }

  getStatusIcon(status: TestResult['status']): string {
    switch (status) {
      case 'passed': return '✅';
      case 'failed': return '❌';
      case 'running': return '⏳';
      case 'pending': return '⏸️';
      default: return '❓';
    }
  }

  getStatusClass(status: TestResult['status']): string {
    switch (status) {
      case 'passed': return 'text-success';
      case 'failed': return 'text-danger';
      case 'running': return 'text-warning';
      case 'pending': return 'text-secondary';
      default: return 'text-muted';
    }
  }

  getBrowserIcon(browser: string): string {
    switch (browser) {
      case 'chromium': return '🌐';
      case 'firefox': return '🦊';
      case 'webkit': return '🧭';
      default: return '🌐';
    }
  }
}
