import { Injectable } from '@angular/core';
import { UserServiceFixed } from './user-fixed.service';
import { EventBusService } from './event-bus.service';

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
export class OrderServiceFixed {
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
    private userService: UserServiceFixed,
    private eventBus: EventBusService  // ✅ Only depends on EventBus, no circular dependency!
  ) {
    console.log('✅ OrderServiceFixed initialized - NO circular dependencies!');
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

    // ✅ SOLUTION: Publish event instead of calling notification service directly
    this.eventBus.publish({
      type: 'ORDER_CREATED',
      payload: { order: newOrder }
    });

    console.log('✅ Order created and event published:', newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: number, status: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const oldStatus = order.status;
      order.status = status;

      // ✅ SOLUTION: Publish event for other services to react
      this.eventBus.publish({
        type: 'ORDER_STATUS_UPDATED',
        payload: { order, oldStatus, newStatus: status }
      });

      console.log(`✅ Order ${orderId} status updated and event published: ${oldStatus} → ${status}`);
    }
  }

  getOrderById(orderId: number): Order | undefined {
    return this.orders.find(o => o.id === orderId);
  }
}
