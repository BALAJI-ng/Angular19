import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { OrderService } from './order.service';

export interface Notification {
  id: number;
  userId: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];

  constructor(
    private userService: UserService,
    private orderService: OrderService  // ❌ This creates CIRCULAR DEPENDENCY!
  ) {
    console.log('🔔 NotificationService initialized');
  }

  // ❌ PROBLEMATIC: Creates circular dependency chain
  // NotificationService → OrderService → UserService → (potentially back to NotificationService)

  getNotificationsByUserId(userId: number): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }
  createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: this.notifications.length + 1,
      read: false,
      createdAt: new Date()
    };

    this.notifications.push(newNotification);
    console.log('📨 Notification created:', newNotification);
    return newNotification;
  }

  // ❌ PROBLEMATIC: Uses OrderService which already depends on this service
  sendOrderStatusUpdate(orderId: number): void {
    const order = this.orderService.getOrders().find(o => o.id === orderId); // Circular!
    if (order) {
      const user = this.userService.getUserById(order.userId);
      if (user) {
        this.createNotification({
          userId: order.userId,
          message: `Your order #${order.id} status has been updated to ${order.status}`,
          type: 'info'
        });
      }
    }
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      console.log('👁️ Notification marked as read:', notification);
    }
  }
}
