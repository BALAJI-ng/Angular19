import { Injectable } from '@angular/core';
import { UserService } from './user.service';
// import { NotificationService } from './notification.service'; // This would create circular dependency!

export interface Order {
  id: number;
  userId: number;
  items: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 1,
      userId: 1,
      items: ['Laptop', 'Mouse'],
      total: 1200,
      status: 'delivered',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      userId: 2,
      items: ['Phone', 'Case'],
      total: 800,
      status: 'shipped',
      createdAt: new Date('2024-02-01')
    }
  ];

  constructor(
    private userService: UserService
    // private notificationService: NotificationService // ❌ Circular dependency!
  ) {
    console.log('🛒 OrderService initialized');
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrdersByUserId(userId: number): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: this.orders.length + 1,
      createdAt: new Date()
    };

    this.orders.push(newOrder);
    console.log('🛍️ Order created:', newOrder);

    // ✅ SOLUTION: Use dependency injection at method level
    // Instead of injecting NotificationService in constructor
    const user = this.userService.getUserById(order.userId);
    if (user) {
      console.log(`📧 Would send notification to ${user.email} about order ${newOrder.id}`);
    }

    return newOrder;
  }

  updateOrderStatus(orderId: number, status: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const oldStatus = order.status;
      order.status = status;
      console.log(`📦 Order ${orderId} status updated: ${oldStatus} → ${status}`);

      // ❌ PROBLEMATIC: This would create circular dependency
      // this.notificationService.sendOrderStatusUpdate(order);
    }
  }

  // ❌ PROBLEMATIC: This method would create circular dependency
  // sendOrderConfirmation(orderId: number): void {
  //   const order = this.orders.find(o => o.id === orderId);
  //   if (order) {
  //     this.notificationService.sendOrderConfirmation(order); // Circular dependency!
  //   }
  // }
}
