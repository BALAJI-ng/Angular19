import { Component, Inject, InjectionToken, Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Create a proper injection token for better type safety
export const API_URL_TOKEN = new InjectionToken<string>('API_URL');
export const CONFIG_TOKEN = new InjectionToken<any>('CONFIG');
export const LOGGER_TOKEN = new InjectionToken<any>('LOGGER');
export const NOTIFICATION_SERVICE_TOKEN = new InjectionToken<any>('NOTIFICATION_SERVICE');

// Interface for demonstration
export interface INotificationService {
  notify(message: string): void;
}

// Service implementations for useExisting demonstration
@Injectable()
export class EmailNotificationService implements INotificationService {
  notify(message: string): void {
    console.log(`📧 Email: ${message}`);
  }
}

@Injectable()
export class SmsNotificationService implements INotificationService {
  notify(message: string): void {
    console.log(`📱 SMS: ${message}`);
  }
}

// Factory functions
export function createConfig(): any {
  const environment: string = 'development'; // This could come from environment variables
  return {
    apiUrl: environment === 'production' ? 'https://prod-api.com' : 'https://dev-api.com',
    timeout: environment === 'production' ? 10000 : 5000,
    enableLogging: environment !== 'production',
    version: '1.0.0'
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
    }
  };
}

export function createApiUrl(): string {
  // Dynamic URL based on current time (example)
  const hour = new Date().getHours();
  if (hour >= 9 && hour <= 17) {
    return 'https://business-hours-api.com';
  } else {
    return 'https://after-hours-api.com';
  }
}

@Component({
  selector: 'app-di',
  imports: [CommonModule, RouterModule], providers: [
    // Providing ProductService as a class, which allows for easy mocking in tests
    // and ensures that a new instance is created for this component.
    { provide: ProductService, useClass: ProductService },

    // useValue examples
    { provide: API_URL_TOKEN, useValue: 'https://api.example.com' },
    { provide: 'API_URL', useValue: 'https://api.example.com' },

    // useFactory examples - Dynamic value creation
    {
      provide: CONFIG_TOKEN,
      useFactory: createConfig
    },
    {
      provide: LOGGER_TOKEN,
      useFactory: createLogger,
      deps: [CONFIG_TOKEN] // Logger depends on config
    },
    {
      provide: 'DYNAMIC_API_URL',
      useFactory: createApiUrl
    },
    {
      provide: 'TIMESTAMP',
      useFactory: () => new Date().getTime()
    },

    // useExisting examples - Create aliases to existing providers
    // Primary service instances
    { provide: EmailNotificationService, useClass: EmailNotificationService },
    { provide: SmsNotificationService, useClass: SmsNotificationService },

    // useExisting - Create aliases that point to the same instance
    { provide: NOTIFICATION_SERVICE_TOKEN, useExisting: EmailNotificationService },
    { provide: 'PRIMARY_NOTIFICATION', useExisting: EmailNotificationService },
    { provide: 'EMAIL_SERVICE', useExisting: EmailNotificationService },

    // Alternative notification service (separate instance)
    { provide: 'SMS_SERVICE', useExisting: SmsNotificationService },

    // Chain of aliases - all point to the same EmailNotificationService instance
    { provide: 'MAIN_NOTIFICATION', useExisting: 'PRIMARY_NOTIFICATION' },
    { provide: 'APP_NOTIFICATION', useExisting: 'MAIN_NOTIFICATION' }
  ],
  standalone: true,
  templateUrl: './di.component.html',
  styleUrl: './di.component.scss'
})
export class DiComponent {
  data: any;
  apiUrl: string;
  stringTokenApiUrl: string;
  config: any;
  logger: any;
  dynamicApiUrl: string;
  timestamp: number;

  constructor(
    private productService: ProductService,
    @Inject(API_URL_TOKEN) private tokenApiUrl: string,
    @Inject('API_URL') private injectedApiUrl: string,
    @Inject(CONFIG_TOKEN) private injectedConfig: any,
    @Inject(LOGGER_TOKEN) private injectedLogger: any,
    @Inject('DYNAMIC_API_URL') private injectedDynamicApiUrl: string,
    @Inject('TIMESTAMP') private injectedTimestamp: number,

    // useExisting injections - All these refer to the same EmailNotificationService instance
    private emailService: EmailNotificationService,
    @Inject(NOTIFICATION_SERVICE_TOKEN) private notificationService: INotificationService,
    @Inject('PRIMARY_NOTIFICATION') private primaryNotification: INotificationService,
    @Inject('EMAIL_SERVICE') private emailAlias: INotificationService,
    @Inject('MAIN_NOTIFICATION') private mainNotification: INotificationService,
    @Inject('APP_NOTIFICATION') private appNotification: INotificationService,

    // Different service instance
    @Inject('SMS_SERVICE') private smsService: INotificationService
  ) {
    this.data = this.productService.getProducts();
    this.apiUrl = tokenApiUrl;
    this.stringTokenApiUrl = injectedApiUrl;
    this.config = injectedConfig;
    this.logger = injectedLogger;
    this.dynamicApiUrl = injectedDynamicApiUrl;
    this.timestamp = injectedTimestamp;

    this.demonstrateProviderTypes();
  }
  private demonstrateProviderTypes(): void {
    // Demonstrate useValue examples
    console.log('=== useValue Examples ===');
    console.log('Token-based API URL:', this.apiUrl);
    console.log('String-based API URL:', this.stringTokenApiUrl);

    console.log('\n=== useFactory Examples ===');
    console.log('Factory-created Config:', this.config);
    console.log('Dynamic API URL:', this.dynamicApiUrl);
    console.log('Component created at timestamp:', this.timestamp);

    // Use factory-created logger
    this.logger.log('DiComponent initialized with factory-created dependencies');

    console.log('\n=== useExisting Examples ===');
    this.demonstrateUseExisting();

    console.log('\n=== Why Token Injection? ===');
    this.demonstrateTokenBenefits();

    // Use in HTTP requests or other operations
    this.makeApiCall();
  }

  private demonstrateTokenBenefits(): void {
    console.log('🔑 Token Injection Benefits Demo:');

    // 1. Type Safety
    console.log('1. Type Safety:');
    console.log('   ✅ apiUrl is typed as string:', typeof this.apiUrl);
    console.log('   ✅ config is typed with interface:', typeof this.config);
    console.log('   ✅ timestamp is typed as number:', typeof this.timestamp);

    // 2. Intellisense Example
    console.log('2. IntelliSense Support:');
    console.log('   ✅ config.apiUrl:', this.config.apiUrl); // IDE knows this exists
    console.log('   ✅ config.timeout:', this.config.timeout); // IDE autocomplete

    // 3. Refactoring Safety
    console.log('3. Refactoring Safety:');
    console.log('   ✅ Renaming API_URL_TOKEN updates all references');
    console.log('   ✅ Find all usages works perfectly');

    // 4. No Naming Conflicts
    console.log('4. No Naming Conflicts:');
    console.log('   ✅ API_URL_TOKEN is unique symbol');
    console.log('   ✅ Cannot accidentally reuse token');

    // 5. Runtime Safety
    console.log('5. Runtime Safety:');
    try {
      // This would be caught at compile time with tokens
      console.log('   ✅ No typos possible with token references');
    } catch (error) {
      console.log('   ❌ String tokens can have runtime typos');
    }
  }

  public demonstrateUseExisting(): void {
    console.log('Testing useExisting provider pattern...');

    // All these should refer to the same EmailNotificationService instance
    this.emailService.notify('Direct EmailService injection');
    this.notificationService.notify('Through NOTIFICATION_SERVICE_TOKEN');
    this.primaryNotification.notify('Through PRIMARY_NOTIFICATION alias');
    this.emailAlias.notify('Through EMAIL_SERVICE alias');
    this.mainNotification.notify('Through MAIN_NOTIFICATION (chained alias)');
    this.appNotification.notify('Through APP_NOTIFICATION (chained alias)');

    // This should be a different instance (SmsNotificationService)
    this.smsService.notify('Through SMS_SERVICE (different instance)');

    // Verify they are the same instance
    console.log('\nInstance comparison:');
    console.log('emailService === notificationService:', this.emailService === this.notificationService);
    console.log('primaryNotification === emailAlias:', this.primaryNotification === this.emailAlias);
    console.log('mainNotification === appNotification:', this.mainNotification === this.appNotification);
    console.log('emailService === smsService:', this.emailService === this.smsService); // Should be false
  }

  private makeApiCall(): void {
    // Example of using the injected API URL
    this.logger.log(`Making API call to: ${this.dynamicApiUrl}/products`);
    this.logger.log(`Using config timeout: ${this.config.timeout}ms`);

    // Simulate API call with factory-created config
    console.log(`API Request Details:
      - URL: ${this.dynamicApiUrl}/products
      - Timeout: ${this.config.timeout}ms
      - Logging enabled: ${this.config.enableLogging}
      - Version: ${this.config.version}
      - Request timestamp: ${this.timestamp}`);

    // You would typically use this with HttpClient
    // this.http.get(`${this.dynamicApiUrl}/products`, { 
    //   timeout: this.config.timeout 
    // })
  }

  // Method to demonstrate factory re-creation (if needed)
  public refreshTimestamp(): void {
    // Note: Factory functions are called once when the provider is created
    // To get fresh values, you'd need to create a service that calls the factory
    this.logger.log('Current timestamp from factory: ' + this.timestamp);
  }

}
