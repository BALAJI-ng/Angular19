import { Injectable } from '@angular/core';
// import { OrderService } from './order.service'; // This would create circular dependency!

export interface User {
  id: number;
  name: string;
  email: string;
  orders?: any[]; // We'll populate this without circular dependency
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  constructor() {
    console.log('🏗️ UserService initialized');
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    console.log('👤 User created:', newUser);
    return newUser;
  }

  // ❌ PROBLEMATIC: This would create circular dependency
  // getUserOrders(userId: number): any[] {
  //   return this.orderService.getOrdersByUserId(userId); // Circular dependency!
  // }

  // ✅ SOLUTION: Use event-driven approach or inject at method level
  updateUserProfile(userId: number, updates: Partial<User>): void {
    const user = this.getUserById(userId);
    if (user) {
      Object.assign(user, updates);
      console.log('📝 User updated:', user);
    }
  }
}
