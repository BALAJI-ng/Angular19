import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Union type definitions
type Status = 'loading' | 'success' | 'error' | 'idle';
type Theme = 'light' | 'dark' | 'auto';
type UserRole = 'admin' | 'user' | 'guest';

// Union with different types
type StringOrNumber = string | number;
type ID = string | number;

// More complex union types
type ApiResponse =
  | { status: 'success'; data: any; message: string }
  | { status: 'error'; error: string; code: number }
  | { status: 'loading'; progress: number };

interface User {
  id: ID;
  name: string;
  role: UserRole;
}

@Component({
  selector: 'app-union-types',
  imports: [CommonModule],
  templateUrl: './union-types.component.html',
  styleUrl: './union-types.component.scss'
})
export class UnionTypesComponent {
  // Basic union type examples
  currentStatus: Status = 'idle';
  currentTheme: Theme = 'light';
  userRole: UserRole = 'user';

  // Union with different types
  userId: StringOrNumber = 123;
  productId: StringOrNumber = 'prod-456';

  // Array of union types
  statusHistory: Status[] = ['idle', 'loading', 'success'];

  // Object with union type properties
  user: User = {
    id: 'user-123',
    name: 'John Doe',
    role: 'admin'
  };

  // API response examples
  apiResponses: ApiResponse[] = [
    { status: 'loading', progress: 50 },
    { status: 'success', data: { users: [] }, message: 'Data loaded successfully' },
    { status: 'error', error: 'Failed to load data', code: 404 }
  ];

  constructor() {
    this.demonstrateUnionTypes();
  }

  // Method demonstrating union type usage
  setStatus(newStatus: Status): void {
    this.currentStatus = newStatus;
    console.log(`Status changed to: ${newStatus}`);
  }

  // Type guard function
  isStringId(id: StringOrNumber): id is string {
    return typeof id === 'string';
  }

  // Using type guards with union types
  processId(id: StringOrNumber): string {
    if (this.isStringId(id)) {
      return id.toUpperCase(); // TypeScript knows id is string here
    } else {
      return id.toString(); // TypeScript knows id is number here
    }
  }

  // Discriminated union example
  handleApiResponse(response: ApiResponse): void {
    switch (response.status) {
      case 'loading':
        console.log(`Loading progress: ${response.progress}%`);
        break;
      case 'success':
        console.log(`Success: ${response.message}`, response.data);
        break;
      case 'error':
        console.error(`Error ${response.code}: ${response.error}`);
        break;
    }
  }

  // Function with union type parameters
  updateTheme(theme: Theme): void {
    this.currentTheme = theme;
    document.body.className = `theme-${theme}`;
  }

  // Function returning union type
  getUserPermissionLevel(): 'read' | 'write' | 'admin' {
    switch (this.userRole) {
      case 'admin':
        return 'admin';
      case 'user':
        return 'write';
      case 'guest':
        return 'read';
      default:
        return 'read';
    }
  }

  // Demonstration method
  private demonstrateUnionTypes(): void {
    console.log('=== Union Types Examples ===');

    // Basic union types
    console.log('1. Basic Status Union:', this.currentStatus);
    this.setStatus('loading');
    this.setStatus('success');

    // String or Number union
    console.log('2. String or Number Union:');
    console.log('  String ID:', this.processId('abc-123'));
    console.log('  Number ID:', this.processId(456));

    // Discriminated unions
    console.log('3. Discriminated Union (API Responses):');
    this.apiResponses.forEach(response => {
      this.handleApiResponse(response);
    });

    // Theme switching
    console.log('4. Theme Union:');
    ['light', 'dark', 'auto'].forEach(theme => {
      this.updateTheme(theme as Theme);
      console.log(`  Theme set to: ${theme}`);
    });

    // Permission levels
    console.log('5. Permission Level:', this.getUserPermissionLevel());

    console.log('=== End Examples ===');
  }

  // Additional examples for template usage
  getStatusColor(status: Status): string {
    switch (status) {
      case 'loading': return 'blue';
      case 'success': return 'green';
      case 'error': return 'red';
      case 'idle': return 'gray';
    }
  }

  getThemeIcon(theme: Theme): string {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'auto': return '🔄';
    }
  }

  getRoleIcon(role: UserRole): string {
    switch (role) {
      case 'admin': return '👑';
      case 'user': return '👤';
      case 'guest': return '👥';
    }
  }
}
