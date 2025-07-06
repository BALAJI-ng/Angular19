# Playwright E2E Testing Setup

This Angular application includes comprehensive end-to-end testing using Playwright, a modern testing framework that supports cross-browser testing.

## 🚀 Features

- **Cross-browser Testing**: Test across Chromium, Firefox, and WebKit
- **Auto-wait**: Automatically waits for elements to be actionable
- **Network Interception**: Mock API responses and test offline scenarios
- **Screenshots & Videos**: Capture visual evidence of test failures
- **Parallel Testing**: Run tests in parallel for faster execution
- **Trace Viewer**: Debug tests with detailed trace information

## 📦 Installation

Playwright is already installed in this project. If you need to install it in a new project:

```bash
npm install -D @playwright/test
npx playwright install
```

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm run test:e2e

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in debug mode
npm run test:e2e:debug

# Show test reports
npm run test:e2e:report
```

### Advanced Commands

```bash
# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test tests/app.spec.ts

# Run tests with specific grep pattern
npx playwright test --grep "navigation"
```

## 📁 Project Structure

```
├── playwright.config.ts          # Playwright configuration
├── tests/                        # Test files
│   ├── app.spec.ts               # Main application tests
│   └── playwright-component.spec.ts # Playwright component tests
├── .github/workflows/
│   └── playwright.yml            # GitHub Actions workflow
└── playwright-report/            # Generated test reports
```

## 🔧 Configuration

The `playwright.config.ts` file contains:

- **Test Directory**: `./tests`
- **Base URL**: `http://localhost:4200`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Reporters**: HTML reporter for detailed results
- **Web Server**: Automatically starts Angular dev server

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

The report includes:
- Test results summary
- Screenshots on failure
- Video recordings
- Trace files for debugging

## 🎯 Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Create page object models** for reusable test code
3. **Use explicit waits** instead of arbitrary timeouts
4. **Mock external dependencies** and APIs
5. **Run tests in headless mode** for CI/CD pipelines
6. **Use screenshot comparisons** for visual testing

## 📝 Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    await page.click('button[data-testid="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

### Page Object Model Example

```typescript
class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="login-button"]');
  }
}
```

## 🔍 Debugging

### Visual Debugging

```bash
# Run with headed browser
npm run test:e2e:headed

# Run with UI mode
npm run test:e2e:ui

# Debug specific test
npx playwright test --debug tests/app.spec.ts
```

### Trace Viewer

```bash
# Generate trace on failure
npx playwright test --trace on-first-retry

# View trace file
npx playwright show-trace trace.zip
```

## 🚀 CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Installs dependencies
2. Builds the Angular application
3. Runs Playwright tests
4. Uploads test artifacts

## 📱 Mobile Testing

The configuration includes mobile device testing:

- **Mobile Chrome** (Pixel 5)
- **Mobile Safari** (iPhone 12)

Access mobile-specific tests:

```bash
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## 🤝 Contributing

When adding new features:

1. Write corresponding E2E tests
2. Follow the existing test patterns
3. Use appropriate selectors and waits
4. Include both positive and negative test cases
5. Test across different browsers and devices

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [CI/CD Integration](https://playwright.dev/docs/ci)
