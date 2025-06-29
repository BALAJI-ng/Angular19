import { Component, Inject, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Simple Value Token
export const API_URL = new InjectionToken<string>('api.url');

// 2. Configuration Object Token
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  debugMode: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// 3. Service Interface Token
export interface LoggerService {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

export const LOGGER_SERVICE = new InjectionToken<LoggerService>('logger.service');

// 4. Feature Flag Token
export const FEATURE_FLAGS = new InjectionToken<Record<string, boolean>>('feature.flags');

// 5. Theme Configuration Token
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
}

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('theme.config');

@Component({
  selector: 'app-injection-token',
  imports: [CommonModule],
  templateUrl: './injection-token.component.html',
  styleUrl: './injection-token.component.scss',
  providers: [
    // Providing tokens at component level
    { provide: API_URL, useValue: 'https://api.example.com/v1' },
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.example.com/v1',
        timeout: 5000,
        retries: 3,
        debugMode: true
      } as AppConfig
    },
    {
      provide: LOGGER_SERVICE,
      useValue: {
        log: (msg: string) => console.log(`[LOG]: ${msg}`),
        error: (msg: string) => console.error(`[ERROR]: ${msg}`),
        warn: (msg: string) => console.warn(`[WARN]: ${msg}`)
      } as LoggerService
    },
    {
      provide: FEATURE_FLAGS,
      useValue: {
        enableNewDashboard: true,
        enableExperimentalFeatures: false,
        enableBetaFeatures: true,
        enableAdvancedSearch: true
      }
    },
    {
      provide: THEME_CONFIG,
      useValue: {
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        darkMode: false
      } as ThemeConfig
    }
  ]
})
export class InjectionTokenComponent {

  // Injected values
  injectedValues: any = {};

  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    @Inject(LOGGER_SERVICE) private logger: LoggerService,
    @Inject(FEATURE_FLAGS) private featureFlags: Record<string, boolean>,
    @Inject(THEME_CONFIG) private themeConfig: ThemeConfig
  ) {
    // Store injected values for display
    this.injectedValues = {
      apiUrl: this.apiUrl,
      appConfig: this.appConfig,
      featureFlags: this.featureFlags,
      themeConfig: this.themeConfig
    };

    // Log initialization
    this.logger.log('InjectionTokenComponent initialized with injected tokens');
    this.logger.warn('This is a warning message from injected logger');
  }

  // Demo methods to show token usage
  testApiCall(): void {
    this.logger.log(`Making API call to: ${this.apiUrl}/users`);

    // Simulate API call with injected config
    setTimeout(() => {
      if (this.appConfig.debugMode) {
        this.logger.log(`API timeout set to: ${this.appConfig.timeout}ms`);
        this.logger.log(`Retries configured: ${this.appConfig.retries}`);
      }
    }, 1000);
  }

  checkFeatureFlag(flagName: string): boolean {
    const isEnabled = this.featureFlags[flagName] || false;
    this.logger.log(`Feature '${flagName}' is ${isEnabled ? 'enabled' : 'disabled'}`);
    return isEnabled;
  }

  applyTheme(): void {
    this.logger.log(`Applying theme with primary color: ${this.themeConfig.primaryColor}`);
    this.logger.log(`Dark mode: ${this.themeConfig.darkMode ? 'enabled' : 'disabled'}`);
  }

  logSomething(): void {
    this.logger.log('This is a test log message');
    this.logger.warn('This is a test warning message');
    this.logger.error('This is a test error message');
  }

  getFeatureFlagKeys(): string[] {
    return Object.keys(this.featureFlags);
  }

  isFeatureEnabled(feature: string): boolean {
    return this.featureFlags[feature] || false;
  }
}
