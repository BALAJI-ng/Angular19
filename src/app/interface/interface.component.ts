import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Basic Interface Examples
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  isActive: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Advanced Interface Examples
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

// Utility Types Examples
interface UtilityTypeExamples {
  // Partial - Makes all properties optional
  partialUser: Partial<User>;
  // Required - Makes all properties required (opposite of Partial)
  requiredUser: Required<User>;
  // Pick - Selects specific properties
  userBasicInfo: Pick<User, 'id' | 'name' | 'email'>;
  // Omit - Excludes specific properties
  userWithoutId: Omit<User, 'id'>;
  // Record - Creates object type with specific keys and value types
  userRoles: Record<string, boolean>;
  // Readonly - Makes all properties readonly
  readonlyUser: Readonly<User>;
}


//api resoinse
interface ApiResponseExample<T> {
  success: boolean;
  message: string;
  data: User[];
  timestamp: Date;
}




// Interface with Methods
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): string;
  stop(): string;
  getInfo(): string;
}

// Interface Inheritance
interface Animal {
  name: string;
  species: string;
  age: number;
}

interface Pet extends Animal {
  owner: string;
  isVaccinated: boolean;
  favoriteToy?: string;
}

// Generic Interface
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: Date;
}

// Function Interface
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// Interface for Angular Service
interface UserService {
  getUsers(): User[];
  getUserById(id: number): User | undefined;
  createUser(user: Omit<User, 'id'>): User;
  updateUser(id: number, updates: Partial<User>): User | undefined;
  deleteUser(id: number): boolean;
}

@Component({
  selector: 'app-interface',
  imports: [CommonModule, FormsModule],
  templateUrl: './interface.component.html',
  styleUrl: './interface.component.scss'
})
export class InterfaceComponent implements OnInit {

  // Basic Interface Examples
  sampleUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    isActive: true
  };

  sampleAddress: Address = {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  };



  // Product Example
  sampleProduct: Product = {
    id: 101,
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
    tags: ['computer', 'portable', 'work'],
    dimensions: {
      width: 14,
      height: 10,
      depth: 0.8
    }
  };

  // Pet Example (Interface Inheritance)
  myPet: Pet = {
    name: 'Buddy',
    species: 'Dog',
    age: 3,
    owner: 'Alice Smith',
    isVaccinated: true,
    favoriteToy: 'Tennis Ball'
  };

  // Generic Interface Examples
  userApiResponse: ApiResponse<User[]> = {
    success: true,
    message: 'Users retrieved successfully',
    data: [this.sampleUser],
    timestamp: new Date()
  };

  productApiResponse: ApiResponse<Product> = {
    success: true,
    message: 'Product retrieved successfully',
    data: this.sampleProduct,
    timestamp: new Date()
  };

  // Vehicle Implementation
  myCar: Vehicle = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    start: () => '🚗 Engine started!',
    stop: () => '🛑 Engine stopped!',
    getInfo: function () {
      return `${this.year} ${this.brand} ${this.model}`;
    }
  };

  // Calculator Implementation
  calculator: Calculator = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => b !== 0 ? a / b : 0
  };

  // Form Data
  newUser: Partial<User> = {};
  newProduct: Partial<Product> = {};

  // Calculator Form Data
  calculatorResult = 0;
  num1 = 0;
  num2 = 0;
  operation = 'add';

  // Demo Arrays
  users: User[] = [
    this.sampleUser,
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, isActive: false },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', isActive: true }
  ];

  products: Product[] = [
    this.sampleProduct,
    {
      id: 102,
      name: 'Smartphone',
      price: 699.99,
      category: 'Electronics',
      inStock: false,
      tags: ['mobile', 'communication', 'portable']
    }
  ];

  // Utility Types Examples
  utilityExamples: UtilityTypeExamples = {
    // Partial - All properties become optional
    partialUser: { name: 'John' }, // Only name is provided, others are optional

    // Required - All properties become required (even optional ones)
    requiredUser: { id: 1, name: 'Jane', email: 'jane@ex.com', age: 25, isActive: true },

    // Pick - Only selected properties
    userBasicInfo: { id: 1, name: 'Bob', email: 'bob@ex.com' },

    // Omit - Excludes specified properties  
    userWithoutId: { name: 'Alice', email: 'alice@ex.com', age: 30, isActive: true },

    // Record - Object with specific key-value types
    userRoles: { admin: true, editor: false, viewer: true },

    // Readonly - All properties become readonly
    readonlyUser: { id: 1, name: 'ReadOnly User', email: 'readonly@ex.com', isActive: true }
  };

  // Practical Partial Examples
  partialUpdateUser: Partial<User> = { age: 35 }; // Only updating age
  partialSearchCriteria: Partial<User> = { isActive: true }; // Only filtering by active status

  ngOnInit(): void {
    console.log('=== Interface Examples ===');
    console.log('Sample User:', this.sampleUser);
    console.log('Sample Product:', this.sampleProduct);
    console.log('My Pet:', this.myPet);
    console.log('Car Info:', this.myCar.getInfo());
    console.log('API Response:', this.userApiResponse);
  }

  sampleAPI: ApiResponseExample<User> = {
    success: true,
    message: 'Sample API call successful',
    data: [this.sampleUser],
    timestamp: new Date()
  };

  // User Management Methods
  addUser(): void {
    if (this.newUser.name && this.newUser.email) {
      const user: User = {
        id: this.users.length + 1,
        name: this.newUser.name,
        email: this.newUser.email,
        age: this.newUser.age,
        isActive: this.newUser.isActive || false
      };
      this.users = [...this.users, user];
      this.newUser = {}; // Reset form
    }
  }

  toggleUserStatus(userId: number): void {
    this.users = this.users.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  // Product Management Methods
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price) {
      const product: Product = {
        id: this.products.length + 101,
        name: this.newProduct.name,
        price: this.newProduct.price,
        category: this.newProduct.category || 'General',
        inStock: this.newProduct.inStock || false,
        tags: this.newProduct.tags || []
      };
      this.products = [...this.products, product];
      this.newProduct = {}; // Reset form
    }
  }

  toggleProductStock(productId: number): void {
    this.products = this.products.map(product =>
      product.id === productId ? { ...product, inStock: !product.inStock } : product
    );
  }

  // Calculator Methods
  calculate(): void {
    switch (this.operation) {
      case 'add':
        this.calculatorResult = this.calculator.add(this.num1, this.num2);
        break;
      case 'subtract':
        this.calculatorResult = this.calculator.subtract(this.num1, this.num2);
        break;
      case 'multiply':
        this.calculatorResult = this.calculator.multiply(this.num1, this.num2);
        break;
      case 'divide':
        this.calculatorResult = this.calculator.divide(this.num1, this.num2);
        break;
    }
  }

  // Vehicle Methods
  startCar(): string {
    return this.myCar.start();
  }

  stopCar(): string {
    return this.myCar.stop();
  }

  // Utility Methods
  getActiveUsersCount(): number {
    return this.users.filter(user => user.isActive).length;
  }

  getInStockProductsCount(): number {
    return this.products.filter(product => product.inStock).length;
  }

  getTotalProductValue(): number {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}
