# Angular Dependency Injection Patterns

This document provides a comprehensive overview of the four Angular dependency injection provider patterns implemented in this project.

## Overview

Angular's dependency injection system supports four types of providers:

1. **useClass** - Class Provider
2. **useValue** - Value Provider
3. **useFactory** - Factory Provider
4. **useExisting** - Existing Provider (Alias Provider)

## 1. useClass Provider

### Purpose

Creates new instances of a class when injected. This is the default behavior for most services.

### Example

```typescript
{ provide: ProductService, useClass: ProductService }
```

### Use Cases

- Standard service injection
- Providing alternative implementations (testing mocks)
- Class inheritance scenarios

### Implementation in DiComponent

```typescript
{ provide: ProductService, useClass: ProductService }
```

## 2. useValue Provider

### Purpose

Provides a pre-configured value, constant, or object directly without instantiation.

### Examples

```typescript
// With InjectionToken (recommended)
export const API_URL_TOKEN = new InjectionToken<string>('API_URL');
{ provide: API_URL_TOKEN, useValue: 'https://api.example.com' }

// With string token (less type-safe)
{ provide: 'API_URL', useValue: 'https://api.example.com' }
```

### Use Cases

- Configuration values
- Environment variables
- Static constants
- Pre-configured objects

### Benefits

- Type safety with InjectionToken
- No instantiation overhead
- Immutable configuration

## 3. useFactory Provider

### Purpose

Creates values dynamically by calling a factory function. Useful for complex initialization logic.

### Examples

```typescript
// Simple factory
{
  provide: 'TIMESTAMP',
  useFactory: () => new Date().getTime()
}

// Factory with dependencies
{
  provide: LOGGER_TOKEN,
  useFactory: createLogger,
  deps: [CONFIG_TOKEN]
}
```

### Factory Functions

```typescript
export function createConfig(): any {
  const environment: string = "development";
  return {
    apiUrl: environment === "production" ? "https://prod-api.com" : "https://dev-api.com",
    timeout: environment === "production" ? 10000 : 5000,
    enableLogging: environment !== "production",
    version: "1.0.0",
  };
}

export function createLogger(config: any): any {
  return {
    log: (message: string) => {
      if (config.enableLogging) {
        console.log(`[${new Date().toISOString()}] ${message}`);
      }
    },
    error: (message: string) => {
      console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    },
  };
}
```

### Use Cases

- Environment-based configuration
- Dynamic service creation
- Time-based values
- Complex initialization logic
- Services that depend on other injected values

### Benefits

- Dynamic value creation
- Environment-aware configuration
- Dependency injection in factory functions

## 4. useExisting Provider (Alias Provider)

### Purpose

Creates aliases to existing providers. Multiple tokens can refer to the same singleton instance.

### Examples

```typescript
// Primary service
{ provide: EmailNotificationService, useClass: EmailNotificationService }

// Create aliases that all point to the same instance
{ provide: NOTIFICATION_SERVICE_TOKEN, useExisting: EmailNotificationService }
{ provide: 'PRIMARY_NOTIFICATION', useExisting: EmailNotificationService }
{ provide: 'EMAIL_SERVICE', useExisting: EmailNotificationService }

// Chained aliases
{ provide: 'MAIN_NOTIFICATION', useExisting: 'PRIMARY_NOTIFICATION' }
{ provide: 'APP_NOTIFICATION', useExisting: 'MAIN_NOTIFICATION' }
```

### Interface Implementation

```typescript
export interface INotificationService {
  notify(message: string): void;
}

@Injectable()
export class EmailNotificationService implements INotificationService {
  notify(message: string): void {
    console.log(`📧 Email: ${message}`);
  }
}

// Multiple interfaces/tokens pointing to same implementation
{ provide: EmailNotificationService, useClass: EmailNotificationService }
{ provide: INotificationService, useExisting: EmailNotificationService }
{ provide: 'NOTIFICATION_SERVICE', useExisting: EmailNotificationService }
```

### Use Cases

- **Multiple Names**: Same service available under different tokens
- **Interface Implementation**: Abstract classes/interfaces pointing to concrete implementations
- **Backwards Compatibility**: Old token names pointing to new implementations
- **Service Aliasing**: Different departments using different names for same service
- **Migration**: Gradually moving from old to new service names

### Benefits

- **Single Instance**: All aliases refer to the same object instance
- **Memory Efficient**: No duplicate instances created
- **Consistent State**: All references share the same state
- **Flexible Naming**: Multiple meaningful names for the same service

### Instance Verification

```typescript
// All these will be true
console.log("emailService === notificationService:", this.emailService === this.notificationService);
console.log("primaryNotification === emailAlias:", this.primaryNotification === this.emailAlias);
console.log("mainNotification === appNotification:", this.mainNotification === this.appNotification);
```

## Complete Implementation Example

```typescript
@Component({
  providers: [
    // useClass
    { provide: ProductService, useClass: ProductService },

    // useValue
    { provide: API_URL_TOKEN, useValue: "https://api.example.com" },
    { provide: "API_URL", useValue: "https://api.example.com" },

    // useFactory
    { provide: CONFIG_TOKEN, useFactory: createConfig },
    { provide: LOGGER_TOKEN, useFactory: createLogger, deps: [CONFIG_TOKEN] },
    { provide: "TIMESTAMP", useFactory: () => new Date().getTime() },

    // useExisting
    { provide: EmailNotificationService, useClass: EmailNotificationService },
    { provide: NOTIFICATION_SERVICE_TOKEN, useExisting: EmailNotificationService },
    { provide: "PRIMARY_NOTIFICATION", useExisting: EmailNotificationService },
    { provide: "MAIN_NOTIFICATION", useExisting: "PRIMARY_NOTIFICATION" },
  ],
})
export class DiComponent {
  constructor(
    private productService: ProductService, // useClass
    @Inject(API_URL_TOKEN) private apiUrl: string, // useValue
    @Inject(CONFIG_TOKEN) private config: any, // useFactory
    @Inject(LOGGER_TOKEN) private logger: any, // useFactory
    private emailService: EmailNotificationService, // useExisting (original)
    @Inject(NOTIFICATION_SERVICE_TOKEN) private notificationService: INotificationService, // useExisting (alias)
    @Inject("PRIMARY_NOTIFICATION") private primaryNotification: INotificationService // useExisting (alias)
  ) {
    // All notification services are the same instance
    console.log(this.emailService === this.notificationService); // true
    console.log(this.notificationService === this.primaryNotification); // true
  }
}
```

## Best Practices

### When to Use Each Pattern

1. **useClass**:

   - Standard services
   - When you need new instances
   - Testing with mocks

2. **useValue**:

   - Configuration constants
   - Environment variables
   - Static data

3. **useFactory**:

   - Dynamic configuration
   - Environment-based setup
   - Complex initialization
   - When dependencies are needed for creation

4. **useExisting**:
   - Service aliasing
   - Interface implementations
   - Backwards compatibility
   - Multiple names for same service
   - Migration scenarios

### Type Safety Tips

- Always use `InjectionToken<T>` instead of string tokens for better type safety
- Define clear interfaces for your services
- Use meaningful token names

### Performance Considerations

- `useValue` has no instantiation overhead
- `useFactory` functions are called once when the provider is created
- `useExisting` creates no additional instances, just aliases
- `useClass` creates new instances each time (unless singleton)

## Testing Benefits

Each pattern provides different testing advantages:

- **useClass**: Easy to replace with mock implementations
- **useValue**: Simple to override with test values
- **useFactory**: Can be mocked to return test-specific values
- **useExisting**: All aliases can be replaced by replacing the original service

## Conclusion

Understanding these four dependency injection patterns allows you to:

- Write more flexible and maintainable code
- Handle complex configuration scenarios
- Create clean service architectures
- Implement effective testing strategies
- Manage service lifetimes appropriately

The combination of all four patterns provides a powerful foundation for building scalable Angular applications.
