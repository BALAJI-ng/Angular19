import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Base interfaces for demonstrations
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
  tags: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: Date;
  errors?: string[];
}

// Utility Types Examples
interface UtilityTypesShowcase {
  // Basic Utility Types
  partialUser: Partial<User>;           // All properties optional
  requiredUser: Required<User>;         // All properties required
  pickUser: Pick<User, 'id' | 'name' | 'email'>;  // Select specific properties
  omitUser: Omit<User, 'id' | 'createdAt'>;       // Exclude specific properties
  
  // Advanced Utility Types
  recordType: Record<string, number>;   // Object with specific key-value types
  readonlyUser: Readonly<User>;         // All properties readonly
  nonNullable: NonNullable<string | null | undefined>; // Remove null/undefined
  
  // Function-related Types
  parametersExample: Parameters<(user: User, id: number) => void>; // Function parameters
  returnTypeExample: ReturnType<() => User>; // Function return type
  
  // Conditional Types
  excludeExample: Exclude<'a' | 'b' | 'c', 'a'>; // Exclude types from union
  extractExample: Extract<'a' | 'b' | 'c', 'a' | 'f'>; // Extract types from union
}

// Template Literal Types
type EventNames = 'click' | 'scroll' | 'mousemove';
type EventHandlers = `on${Capitalize<EventNames>}`; // 'onClick' | 'onScroll' | 'onMousemove'

// Mapped Types
type UserFlags = {
  [K in keyof User]: boolean;
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};

// Conditional Types Examples
type IsArray<T> = T extends any[] ? true : false;
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

@Component({
  selector: 'app-reating-types-from-types',
  imports: [CommonModule, FormsModule],
  templateUrl: './reating-types-from-types.component.html',
  styleUrl: './reating-types-from-types.component.scss'
})
export class ReatingTypesFromTypesComponent implements OnInit {

  // Sample data
  sampleUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    isActive: true,
    role: 'admin',
    createdAt: new Date()
  };

  sampleProduct: Product = {
    id: 101,
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
    description: 'High-performance laptop for work and gaming',
    tags: ['computer', 'portable', 'work']
  };

  // Utility Types Examples
  utilityExamples: UtilityTypesShowcase = {
    // Partial - Makes all properties optional
    partialUser: { 
      name: 'Partial User',
      email: 'partial@example.com'
      // id, age, isActive, role, createdAt are optional
    },

    // Required - Makes all properties required (even optional ones)
    requiredUser: {
      id: 2,
      name: 'Required User',
      email: 'required@example.com',
      age: 25, // Now required instead of optional
      isActive: true,
      role: 'user',
      createdAt: new Date()
    },

    // Pick - Select only specific properties
    pickUser: {
      id: 3,
      name: 'Picked User',
      email: 'picked@example.com'
      // Only id, name, email are available
    },

    // Omit - Exclude specific properties
    omitUser: {
      name: 'Omitted User',
      email: 'omitted@example.com',
      age: 28,
      isActive: true,
      role: 'moderator'
      // id and createdAt are omitted
    },

    // Record - Object with specific key-value types
    recordType: {
      admin: 1,
      user: 2,
      moderator: 3
    },

    // Readonly - All properties become readonly
    readonlyUser: {
      id: 4,
      name: 'Readonly User',
      email: 'readonly@example.com',
      isActive: true,
      role: 'user',
      createdAt: new Date()
    },

    // NonNullable - Removes null and undefined
    nonNullable: 'This is definitely a string',

    // Parameters - Extract function parameter types
    parametersExample: [this.sampleUser, 123],

    // ReturnType - Extract function return type
    returnTypeExample: this.sampleUser,

    // Exclude - Remove types from union
    excludeExample: 'b', // 'a' is excluded, so only 'b' | 'c'

    // Extract - Extract types from union
    extractExample: 'a' // Only 'a' matches from the union
  };

  // Interactive examples
  partialUpdateForm: Partial<User> = {};
  searchCriteria: Partial<Product> = {};
  
  // Form data for demonstrations
  newUser: Omit<User, 'id' | 'createdAt'> = {
    name: '',
    email: '',
    isActive: false,
    role: 'user'
  };

  users: User[] = [this.sampleUser];
  products: Product[] = [this.sampleProduct];

  // Template Literal Types example
  eventHandlers: EventHandlers[] = ['onClick', 'onScroll', 'onMousemove'];

  // Mapped Types examples
  userFlags: UserFlags = {
    id: true,
    name: true,
    email: true,
    age: false,
    isActive: true,
    role: true,
    createdAt: false
  };

  // Conditional Types examples
  isStringArray: IsArray<string[]> = true;
  isNumberArray: IsArray<number> = false;
  stringArrayElement: ArrayElementType<string[]> = 'element';

  ngOnInit(): void {
    console.log('=== Creating Types from Types Examples ===');
    console.log('Partial User:', this.utilityExamples.partialUser);
    console.log('Required User:', this.utilityExamples.requiredUser);
    console.log('Pick User:', this.utilityExamples.pickUser);
    console.log('Omit User:', this.utilityExamples.omitUser);
    console.log('Event Handlers:', this.eventHandlers);
    console.log('User Flags:', this.userFlags);
  }

  // Interactive Methods
  updateUserPartially(): void {
    if (this.partialUpdateForm.name || this.partialUpdateForm.email || this.partialUpdateForm.age !== undefined) {
      // Simulate partial update
      const updatedUser = { ...this.sampleUser, ...this.partialUpdateForm };
      console.log('Partially updated user:', updatedUser);
      
      // Update the sample user
      Object.assign(this.sampleUser, this.partialUpdateForm);
      
      // Reset form
      this.partialUpdateForm = {};
    }
  }

  searchProducts(): void {
    let filteredProducts = this.products;

    if (this.searchCriteria.name) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(this.searchCriteria.name!.toLowerCase())
      );
    }

    if (this.searchCriteria.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase().includes(this.searchCriteria.category!.toLowerCase())
      );
    }

    if (this.searchCriteria.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.inStock === this.searchCriteria.inStock
      );
    }

    console.log('Filtered products:', filteredProducts);
  }

  addUser(): void {
    if (this.newUser.name && this.newUser.email) {
      const user: User = {
        ...this.newUser,
        id: this.users.length + 1,
        createdAt: new Date()
      };
      this.users = [...this.users, user];
      
      // Reset form
      this.newUser = {
        name: '',
        email: '',
        isActive: false,
        role: 'user'
      };
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  // Utility type demonstration methods
  demonstrateRecord(): Record<string, any> {
    return {
      userCount: this.users.length,
      productCount: this.products.length,
      lastUpdate: new Date().toISOString()
    };
  }

  demonstratePick(user: User): Pick<User, 'name' | 'email'> {
    return {
      name: user.name,
      email: user.email
    };
  }

  demonstrateOmit(user: User): Omit<User, 'id' | 'createdAt'> {
    const { id, createdAt, ...userWithoutIdAndDate } = user;
    return userWithoutIdAndDate;
  }

  // API Response examples
  getUsersApiResponse(): ApiResponse<User[]> {
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: this.users,
      timestamp: new Date()
    };
  }

  getProductApiResponse(): ApiResponse<Product> {
    return {
      success: true,
      message: 'Product retrieved successfully',
      data: this.sampleProduct,
      timestamp: new Date()
    };
  }

  // Utility method for template access to Object.keys
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // Type-safe method to get UserFlags value
  getUserFlagValue(key: string): boolean {
    return this.userFlags[key as keyof UserFlags] ?? false;
  }
}
