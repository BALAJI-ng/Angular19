# 🎭 Playwright Tutorial & Interview Guide for Capgemini

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Essential Commands](#essential-commands)
4. [Best Practices](#best-practices)
5. [Interview Questions](#interview-questions)
6. [Practical Examples](#practical-examples)

## 🚀 Quick Start

### Installation & Setup

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Run tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed
```

### Your Current Configuration

✅ **Fixed Issues:**

- Changed port from 3000 → 4200 (Angular default)
- Added baseURL configuration
- Increased timeout to 2 minutes
- Added proper Angular app tests

## 🏗️ Core Concepts

### 1. **Test Structure**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto("/");
  });

  test("should do something", async ({ page }) => {
    // Test implementation
  });
});
```

### 2. **Page Object Model (POM)**

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  get emailInput() {
    return this.page.locator("#email");
  }
  get passwordInput() {
    return this.page.locator("#password");
  }
  get loginButton() {
    return this.page.locator('button[type="submit"]');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### 3. **Locator Strategies**

```typescript
// By Role (Most Reliable)
page.getByRole("button", { name: "Submit" });
page.getByRole("link", { name: "Home" });
page.getByRole("textbox", { name: "Email" });

// By Text
page.getByText("Welcome");
page.getByText(/Welcome.*user/i); // Regex

// By Label
page.getByLabel("Password");

// By Placeholder
page.getByPlaceholder("Enter email");

// By Test ID (Recommended for testing)
page.getByTestId("submit-btn");

// CSS/XPath (Last resort)
page.locator(".btn-primary");
page.locator('//button[@class="submit"]');
```

## 🛠️ Essential Commands

### Navigation & Waiting

```typescript
await page.goto("/dashboard");
await page.goBack();
await page.goForward();
await page.reload();

// Wait for different states
await page.waitForLoadState("networkidle");
await page.waitForLoadState("domcontentloaded");
await page.waitForURL("**/dashboard");
await page.waitForSelector(".loading", { state: "hidden" });
```

### Interactions

```typescript
// Click actions
await page.click("button");
await page.dblclick("button");
await page.locator("button").click({ force: true });

// Input actions
await page.fill("#email", "test@example.com");
await page.type("#password", "secret", { delay: 100 });
await page.selectOption("select", "option1");
await page.check("#checkbox");
await page.uncheck("#checkbox");

// Keyboard & Mouse
await page.keyboard.press("Enter");
await page.keyboard.type("Hello World");
await page.mouse.click(100, 200);
```

### Assertions

```typescript
// Visibility
await expect(page.locator(".success")).toBeVisible();
await expect(page.locator(".loading")).toBeHidden();

// Content
await expect(page.locator("h1")).toHaveText("Welcome");
await expect(page.locator("h1")).toContainText("Wel");
await expect(page.locator("#count")).toHaveText("5");

// Attributes
await expect(page.locator("input")).toHaveAttribute("disabled");
await expect(page.locator("a")).toHaveAttribute("href", "/home");

// Page level
await expect(page).toHaveTitle("Dashboard");
await expect(page).toHaveURL("/dashboard");
```

## 🏆 Best Practices

### 1. **Use Data Test IDs**

```html
<!-- In your Angular components -->
<button data-testid="submit-btn">Submit</button>
<input data-testid="email-input" type="email" />
```

```typescript
// In tests
await page.getByTestId("submit-btn").click();
await page.getByTestId("email-input").fill("test@example.com");
```

### 2. **Implement Page Object Pattern**

```typescript
// tests/pages/DashboardPage.ts
export class DashboardPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto("/dashboard");
    await this.page.waitForLoadState("networkidle");
  }

  async getUserName() {
    return await this.page.getByTestId("user-name").textContent();
  }
}
```

### 3. **Use Fixtures for Common Setup**

```typescript
// tests/fixtures.ts
import { test as base } from "@playwright/test";
import { DashboardPage } from "./pages/DashboardPage";

export const test = base.extend<{ dashboardPage: DashboardPage }>({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo();
    await use(dashboardPage);
  },
});
```

### 4. **Handle Async Operations**

```typescript
// Wait for API calls
await page.waitForResponse("**/api/users");
await page.waitForRequest("**/api/login");

// Wait for elements
await page.waitForSelector('[data-testid="user-list"]');
await expect(page.getByTestId("loading")).toBeHidden();
```

## 💼 Interview Questions & Answers

### **Q1: What is Playwright and how does it differ from Selenium?**

**A:** Playwright is a modern end-to-end testing framework that supports multiple browsers (Chrome, Firefox, Safari) and offers:

- **Better Performance**: Faster execution with parallel testing
- **Auto-wait**: Automatically waits for elements to be ready
- **Cross-browser**: Native support for all modern browsers
- **Mobile Testing**: Device emulation built-in
- **Network Interception**: Mock APIs and network requests
- **Screenshots/Videos**: Built-in visual testing

### **Q2: Explain the difference between page.click() and page.locator().click()**

**A:**

- `page.click('selector')` - Direct method, immediate execution
- `page.locator('selector').click()` - Returns a locator object, lazy evaluation, auto-waits

```typescript
// Direct method
await page.click("#button"); // Immediate

// Locator method (Recommended)
const button = page.locator("#button");
await button.click(); // Auto-waits for element to be ready
```

### **Q3: How do you handle dynamic content in Playwright?**

**A:** Multiple strategies:

```typescript
// 1. Wait for specific conditions
await page.waitForFunction(() => document.querySelectorAll(".item").length > 5);

// 2. Use auto-waiting assertions
await expect(page.locator(".dynamic-content")).toBeVisible();

// 3. Wait for network requests
await page.waitForResponse("**/api/data");

// 4. Polling assertions
await expect(async () => {
  const count = await page.locator(".item").count();
  expect(count).toBeGreaterThan(5);
}).toPass({ timeout: 10000 });
```

### **Q4: How do you implement Page Object Model in Playwright?**

**A:**

```typescript
// Base Page
export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("networkidle");
  }
}

// Specific Page
export class LoginPage extends BasePage {
  private emailInput = this.page.getByTestId("email");
  private passwordInput = this.page.getByTestId("password");
  private submitButton = this.page.getByTestId("login-btn");

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### **Q5: How do you handle file uploads in Playwright?**

**A:**

```typescript
// Single file
await page.setInputFiles("#file-input", "path/to/file.pdf");

// Multiple files
await page.setInputFiles("#file-input", ["file1.pdf", "file2.jpg"]);

// Programmatic file creation
await page.setInputFiles("#file-input", {
  name: "test.txt",
  mimeType: "text/plain",
  buffer: Buffer.from("Test content"),
});
```

### **Q6: Explain Playwright's auto-waiting mechanism.**

**A:** Playwright automatically waits for:

- Element to be visible and enabled
- Network requests to complete
- Animations to finish
- No overlapping elements

```typescript
// These automatically wait
await page.click("button"); // Waits for button to be clickable
await expect(page.locator("text")).toBeVisible(); // Waits for element
```

### **Q7: How do you run tests in parallel in Playwright?**

**A:**

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true, // Run all tests in parallel
  workers: process.env.CI ? 1 : undefined, // Number of workers
});

// Test level control
test.describe.configure({ mode: "parallel" }); // Parallel
test.describe.configure({ mode: "serial" }); // Sequential
```

### **Q8: How do you mock API responses in Playwright?**

**A:**

```typescript
test("should handle API mock", async ({ page }) => {
  // Mock API response
  await page.route("**/api/users", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([{ id: 1, name: "John Doe" }]),
    });
  });

  await page.goto("/users");
  await expect(page.getByText("John Doe")).toBeVisible();
});
```

## 🎯 Practical Examples for Your Angular App

### Test Your Event Bus Components

```typescript
test("should test event bus communication", async ({ page }) => {
  await page.goto("/event-bus/parent");

  // Check if parent component loads
  await expect(page.getByText("Parent Component")).toBeVisible();

  // Verify child component receives the event
  await expect(page.getByText("User: Default User (ID: 1)")).toBeVisible();

  // Check user details section
  await expect(page.getByText("ID: 1")).toBeVisible();
  await expect(page.getByText("Name: Default User")).toBeVisible();
});
```

### Test Form Validation

```typescript
test("should validate form inputs", async ({ page }) => {
  await page.goto("/forms");

  // Try submitting empty form
  await page.getByTestId("submit-btn").click();
  await expect(page.getByText("This field is required")).toBeVisible();

  // Fill valid data
  await page.getByTestId("name-input").fill("John Doe");
  await page.getByTestId("email-input").fill("john@example.com");
  await page.getByTestId("submit-btn").click();

  await expect(page.getByText("Form submitted successfully")).toBeVisible();
});
```

## 🎯 Key Takeaways for Capgemini Interview

1. **Know the Fundamentals**: Understand locators, assertions, and waiting strategies
2. **Page Object Model**: Always mention and demonstrate POM pattern
3. **Best Practices**: Auto-waiting, data-testid usage, parallel execution
4. **Debugging**: Screenshots, videos, trace viewer
5. **CI/CD Integration**: How to run tests in pipelines
6. **Cross-browser Testing**: Playwright's multi-browser support
7. **API Mocking**: Network interception capabilities

## 🚀 Quick Commands to Remember

```bash
# Run specific test
npx playwright test login.spec.ts

# Run in debug mode
npx playwright test --debug

# Generate test code
npx playwright codegen localhost:4200

# Show test report
npx playwright show-report

# Run specific browser
npx playwright test --project=chromium

# Run headed mode
npx playwright test --headed
```

**Good luck with your Capgemini interview! 🍀**
