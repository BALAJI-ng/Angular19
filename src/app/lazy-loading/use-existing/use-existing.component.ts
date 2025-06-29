import { Component, Inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

// Service interfaces and implementations
export interface ILoggerService {
    log(message: string): void;
    error(message: string): void;
}

@Injectable()
export class ConsoleLoggerService implements ILoggerService {
    log(message: string): void {
        console.log(`[ConsoleLogger] ${message}`);
    }

    error(message: string): void {
        console.error(`[ConsoleLogger] ${message}`);
    }
}

@Injectable()
export class FileLoggerService implements ILoggerService {
    log(message: string): void {
        console.log(`[FileLogger] ${message} - (would write to file)`);
    }

    error(message: string): void {
        console.error(`[FileLogger] ${message} - (would write to error file)`);
    }
}

// Abstract class for demonstration
@Injectable()
export abstract class BaseService {
    abstract getName(): string;
}

@Injectable()
export class ConcreteService extends BaseService {
    getName(): string {
        return 'ConcreteService';
    }
}

@Component({
    selector: 'app-use-existing',
    imports: [CommonModule],
    providers: [
        // Primary service instance
        { provide: ConsoleLoggerService, useClass: ConsoleLoggerService },

        // useExisting - Creates an alias to an existing provider
        // Both ILoggerService and 'LOGGER' will refer to the same ConsoleLoggerService instance
        { provide: 'ILoggerService', useExisting: ConsoleLoggerService },
        { provide: 'LOGGER', useExisting: ConsoleLoggerService },
        { provide: 'PRIMARY_LOGGER', useExisting: ConsoleLoggerService },

        // Another service for demonstration
        { provide: ConcreteService, useClass: ConcreteService },
        { provide: BaseService, useExisting: ConcreteService },
        { provide: 'BASE_SERVICE', useExisting: ConcreteService },

        // Alternative logger (not used as primary, just for demonstration)
        { provide: FileLoggerService, useClass: FileLoggerService },
        { provide: 'FILE_LOGGER', useExisting: FileLoggerService },

        // Chain of aliases
        { provide: 'MAIN_LOGGER', useExisting: 'LOGGER' },
        { provide: 'APP_LOGGER', useExisting: 'MAIN_LOGGER' }
    ],
    template: `
    <div class="p-4">
      <h2>useExisting Provider Examples</h2>
      
      <div class="card mb-3">
        <div class="card-header">
          <h5>Logger Service Aliases</h5>
        </div>
        <div class="card-body">
          <p>All these tokens refer to the same ConsoleLoggerService instance:</p>
          <button class="btn btn-primary me-2 mb-2" (click)="testLoggerAliases()">
            Test Logger Aliases
          </button>
          <button class="btn btn-secondary me-2 mb-2" (click)="compareInstances()">
            Compare Instances
          </button>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header">
          <h5>Base Service Aliases</h5>
        </div>
        <div class="card-body">
          <p>ConcreteService, BaseService, and 'BASE_SERVICE' all refer to the same instance:</p>
          <button class="btn btn-info me-2 mb-2" (click)="testServiceAliases()">
            Test Service Aliases
          </button>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header">
          <h5>Chained Aliases</h5>
        </div>
        <div class="card-body">
          <p>Demonstrating alias chains: APP_LOGGER → MAIN_LOGGER → LOGGER → ConsoleLoggerService</p>
          <button class="btn btn-warning me-2 mb-2" (click)="testChainedAliases()">
            Test Chained Aliases
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <h6>useExisting Benefits:</h6>
        <ul class="mb-0">
          <li><strong>Single Instance:</strong> All aliases refer to the same object instance</li>
          <li><strong>Multiple Names:</strong> Same service available under different tokens</li>
          <li><strong>Interface Implementation:</strong> Abstract classes can point to concrete implementations</li>
          <li><strong>Backwards Compatibility:</strong> Old token names can point to new implementations</li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-header {
      background-color: #f8f9fa;
    }
  `]
})
export class UseExistingComponent {

    constructor(
        // Direct injection of the primary service
        private consoleLogger: ConsoleLoggerService,

        // Inject the same service through different aliases
        @Inject('ILoggerService') private iLoggerService: ILoggerService,
        @Inject('LOGGER') private logger: ILoggerService,
        @Inject('PRIMARY_LOGGER') private primaryLogger: ILoggerService,

        // Service hierarchy
        private concreteService: ConcreteService,
        private baseService: BaseService,
        @Inject('BASE_SERVICE') private baseServiceAlias: BaseService,

        // File logger (different instance)
        @Inject('FILE_LOGGER') private fileLogger: ILoggerService,

        // Chained aliases
        @Inject('APP_LOGGER') private appLogger: ILoggerService,
        @Inject('MAIN_LOGGER') private mainLogger: ILoggerService
    ) {
        this.consoleLogger.log('UseExistingComponent initialized');
    }

    testLoggerAliases(): void {
        console.log('\n=== Testing Logger Aliases ===');

        this.consoleLogger.log('Message from ConsoleLoggerService');
        this.iLoggerService.log('Message from ILoggerService alias');
        this.logger.log('Message from LOGGER alias');
        this.primaryLogger.log('Message from PRIMARY_LOGGER alias');

        console.log('All messages above came from the same service instance!');
    }

    compareInstances(): void {
        console.log('\n=== Comparing Instances ===');

        const isSame1 = this.consoleLogger === this.iLoggerService;
        const isSame2 = this.logger === this.primaryLogger;
        const isSame3 = this.consoleLogger === this.logger;

        console.log('consoleLogger === iLoggerService:', isSame1);
        console.log('logger === primaryLogger:', isSame2);
        console.log('consoleLogger === logger:', isSame3);

        // Compare with different instance
        const isDifferent = this.consoleLogger === this.fileLogger;
        console.log('consoleLogger === fileLogger:', isDifferent);

        console.log('\nAll aliases point to the same instance, except fileLogger which is separate.');
    }

    testServiceAliases(): void {
        console.log('\n=== Testing Service Aliases ===');

        console.log('ConcreteService name:', this.concreteService.getName());
        console.log('BaseService name:', this.baseService.getName());
        console.log('BASE_SERVICE name:', this.baseServiceAlias.getName());

        const isSameInstance = this.concreteService === this.baseService;
        const isSameAlias = this.baseService === this.baseServiceAlias;

        console.log('concreteService === baseService:', isSameInstance);
        console.log('baseService === baseServiceAlias:', isSameAlias);
    }

    testChainedAliases(): void {
        console.log('\n=== Testing Chained Aliases ===');

        this.appLogger.log('Message from APP_LOGGER');
        this.mainLogger.log('Message from MAIN_LOGGER');
        this.logger.log('Message from LOGGER');
        this.consoleLogger.log('Message from ConsoleLoggerService');

        const isChained1 = this.appLogger === this.mainLogger;
        const isChained2 = this.mainLogger === this.logger;
        const isChained3 = this.logger === this.consoleLogger;

        console.log('appLogger === mainLogger:', isChained1);
        console.log('mainLogger === logger:', isChained2);
        console.log('logger === consoleLogger:', isChained3);

        console.log('All chained aliases point to the same ConsoleLoggerService instance!');
    }
}
