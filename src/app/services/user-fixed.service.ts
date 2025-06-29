import { Injectable } from '@angular/core';
import { EventBusService } from './event-bus.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceFixed {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  constructor(private eventBus: EventBusService) {
    console.log('✅ UserServiceFixed initialized - NO circular dependencies!');
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

    // ✅ SOLUTION: Publish event instead of direct dependency
    this.eventBus.publish({
      type: 'USER_CREATED',
      payload: { user: newUser }
    });

    console.log('✅ User created and event published:', newUser);
    return newUser;
  }

  updateUserProfile(userId: number, updates: Partial<User>): void {
    const user = this.getUserById(userId);
    if (user) {
      const oldUser = { ...user };
      Object.assign(user, updates);

      // ✅ SOLUTION: Publish event for other services to react
      this.eventBus.publish({
        type: 'USER_UPDATED',
        payload: { oldUser, newUser: user }
      });

      console.log('✅ User updated and event published:', user);
    }
  }
}
