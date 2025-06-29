import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Generic Interface Examples
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: Date;
  status: number;
}

interface Repository<T> {
  items: T[];
  add(item: T): void;
  getById(id: number): T | undefined;
  getAll(): T[];
  update(id: number, item: Partial<T>): boolean;
  delete(id: number): boolean;
}

// Entity interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  createdAt: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
}

interface Order {
  id: number;
  userId: number;
  productIds: number[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
}

// Generic Class Examples
class DataStore<T extends { id: number }> implements Repository<T> {
  items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, updates: Partial<T>): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  // Additional generic methods
  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  map<U>(mapper: (item: T) => U): U[] {
    return this.items.map(mapper);
  }

  count(): number {
    return this.items.length;
  }
}

// Generic Function Examples
function createApiResponse<T>(data: T, message: string = 'Success'): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date(),
    status: 200
  };
}

function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function arrayToMap<T, K extends keyof T>(array: T[], keyProperty: K): Map<T[K], T> {
  const map = new Map<T[K], T>();
  array.forEach(item => {
    map.set(item[keyProperty], item);
  });
  return map;
}

// Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type PromiseType<T> = T extends Promise<infer U> ? U : never;

// Utility Generic Types
type EntityKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

type StringProperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

@Component({
  selector: 'app-generics',
  imports: [CommonModule, FormsModule],
  templateUrl: './generics.component.html',
  styleUrl: './generics.component.scss'
})
export class GenericsComponent implements OnInit {

  // Generic Data Stores
  userStore = new DataStore<User>();
  productStore = new DataStore<Product>();
  orderStore = new DataStore<Order>();

  // Sample Data
  sampleUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      isActive: true,
      createdAt: new Date('2024-02-10')
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'moderator',
      isActive: false,
      createdAt: new Date('2024-01-20')
    }
  ];

  sampleProducts: Product[] = [
    {
      id: 101,
      name: 'Laptop',
      price: 999.99,
      category: 'Electronics',
      inStock: true,
      description: 'High-performance laptop'
    },
    {
      id: 102,
      name: 'Mouse',
      price: 29.99,
      category: 'Electronics',
      inStock: true,
      description: 'Wireless computer mouse'
    },
    {
      id: 103,
      name: 'Keyboard',
      price: 79.99,
      category: 'Electronics',
      inStock: false,
      description: 'Mechanical keyboard'
    }
  ];

  sampleOrders: Order[] = [
    {
      id: 1001,
      userId: 1,
      productIds: [101, 102],
      total: 1029.98,
      status: 'delivered',
      orderDate: new Date('2024-06-15')
    },
    {
      id: 1002,
      userId: 2,
      productIds: [103],
      total: 79.99,
      status: 'pending',
      orderDate: new Date('2024-06-28')
    }
  ];

  // API Response Examples
  userApiResponse: ApiResponse<User[]> = createApiResponse(this.sampleUsers, 'Users retrieved successfully');
  productApiResponse: ApiResponse<Product> = createApiResponse(this.sampleProducts[0], 'Product retrieved successfully');

  // Form Data
  newUser: Omit<User, 'id' | 'createdAt'> = {
    name: '',
    email: '',
    role: 'user',
    isActive: true
  };

  newProduct: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    category: '',
    inStock: true,
    description: ''
  };

  // Generic function results
  functionResults: any = {};

  // Filter criteria
  userFilter = '';
  productFilter = '';
  priceRange = { min: 0, max: 1000 };

  ngOnInit(): void {
    // Initialize data stores
    this.sampleUsers.forEach(user => this.userStore.add(user));
    this.sampleProducts.forEach(product => this.productStore.add(product));
    this.sampleOrders.forEach(order => this.orderStore.add(order));

    // Demonstrate generic functions
    this.demonstrateGenericFunctions();

    console.log('=== Generics Examples ===');
    console.log('User Store:', this.userStore.getAll());
    console.log('Product Store:', this.productStore.getAll());
    console.log('API Responses:', { users: this.userApiResponse, product: this.productApiResponse });
  }

  // Generic Store Operations
  addUser(): void {
    if (this.newUser.name && this.newUser.email) {
      const user: User = {
        ...this.newUser,
        id: this.userStore.count() + 1,
        createdAt: new Date()
      };
      this.userStore.add(user);
      this.resetUserForm();
    }
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price > 0) {
      const product: Product = {
        ...this.newProduct,
        id: this.productStore.count() + 101
      };
      this.productStore.add(product);
      this.resetProductForm();
    }
  }

  deleteUser(id: number): void {
    this.userStore.delete(id);
  }

  deleteProduct(id: number): void {
    this.productStore.delete(id);
  }

  toggleUserStatus(id: number): void {
    const user = this.userStore.getById(id);
    if (user) {
      this.userStore.update(id, { isActive: !user.isActive });
    }
  }

  toggleProductStock(id: number): void {
    const product = this.productStore.getById(id);
    if (product) {
      this.productStore.update(id, { inStock: !product.inStock });
    }
  }

  // Filtered Data using Generic Methods
  getFilteredUsers(): User[] {
    return this.userStore.filter(user => 
      user.name.toLowerCase().includes(this.userFilter.toLowerCase()) ||
      user.email.toLowerCase().includes(this.userFilter.toLowerCase())
    );
  }

  getFilteredProducts(): Product[] {
    return this.productStore.filter(product =>
      product.name.toLowerCase().includes(this.productFilter.toLowerCase()) &&
      product.price >= this.priceRange.min &&
      product.price <= this.priceRange.max
    );
  }

  // Generic Function Demonstrations
  demonstrateGenericFunctions(): void {
    // Clone example
    const originalUser = this.sampleUsers[0];
    const clonedUser = cloneObject(originalUser);
    
    // Property access example
    const userName = getProperty(originalUser, 'name');
    const userEmail = getProperty(originalUser, 'email');
    
    // Array to Map example
    const userMap = arrayToMap(this.sampleUsers, 'id');
    
    // Store results
    this.functionResults = {
      originalUser,
      clonedUser,
      userName,
      userEmail,
      userMapSize: userMap.size,
      userMapKeys: Array.from(userMap.keys())
    };
  }

  // Utility Methods
  resetUserForm(): void {
    this.newUser = {
      name: '',
      email: '',
      role: 'user',
      isActive: true
    };
  }

  resetProductForm(): void {
    this.newProduct = {
      name: '',
      price: 0,
      category: '',
      inStock: true,
      description: ''
    };
  }

  // Generic utility methods for template
  getEntityCount<T extends { id: number }>(store: DataStore<T>): number {
    return store.count();
  }

  getActiveUsersCount(): number {
    return this.userStore.filter(user => user.isActive).length;
  }

  getInStockProductsCount(): number {
    return this.productStore.filter(product => product.inStock).length;
  }

  getTotalProductValue(): number {
    return this.productStore.getAll().reduce((total, product) => total + product.price, 0);
  }

  // Demonstrate Generic API Response
  createUserResponse(): ApiResponse<User[]> {
    return createApiResponse(this.userStore.getAll(), 'All users retrieved');
  }

  createProductResponse(): ApiResponse<Product[]> {
    return createApiResponse(this.productStore.getAll(), 'All products retrieved');
  }

  // Type-safe property extraction
  getUserNames(): string[] {
    return this.userStore.map(user => user.name);
  }

  getProductCategories(): string[] {
    const categories = this.productStore.map(product => product.category);
    return [...new Set(categories)]; // Remove duplicates
  }
}
