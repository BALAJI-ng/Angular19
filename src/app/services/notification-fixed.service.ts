import { Injectable, OnDestroy } from '@angular/core';
import { UserServiceFixed } from './user-fixed.service';
import { EventBusService } from './event-bus.service';
import { Subscription } from 'rxjs';

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
export class NotificationServiceFixed implements OnDestroy {
  private notifications: Notification[] = [];
  private subscription = new Subscription();

  constructor(
    private userService: UserServiceFixed,
    private eventBus: EventBusService  // ✅ Only depends on EventBus and UserService, NO circular dependency!
  ) {
    console.log('✅ NotificationServiceFixed initialized - NO circular dependencies!');
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    // ✅ SOLUTION: Listen to events instead of direct service calls

    // Listen for order events
    this.subscription.add(
      this.eventBus.subscribeToEventType('ORDER_CREATED').subscribe(event => {
        const { order } = event.payload;
        this.createNotification({
          userId: order.userId,
          message: `Your order #${order.id} has been created successfully! Total: $${order.total}`,
          type: 'success'
        });
      })
    );

    this.subscription.add(
      this.eventBus.subscribeToEventType('ORDER_STATUS_UPDATED').subscribe(event => {
        const { order, newStatus } = event.payload;
        this.createNotification({
          userId: order.userId,
          message: `Your order #${order.id} status has been updated to ${newStatus}`,
          type: 'info'
        });
      })
    );

    // Listen for user events
    this.subscription.add(
      this.eventBus.subscribeToEventType('USER_CREATED').subscribe(event => {
        const { user } = event.payload;
        this.createNotification({
          userId: user.id,
          message: `Welcome to our platform, ${user.name}! Your account has been created.`,
          type: 'success'
        });
      })
    );

    this.subscription.add(
      this.eventBus.subscribeToEventType('USER_UPDATED').subscribe(event => {
        const { newUser } = event.payload;
        this.createNotification({
          userId: newUser.id,
          message: `Your profile has been updated successfully!`,
          type: 'info'
        });
      })
    );
  }

  getNotificationsByUserId(userId: number): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }

  getAllNotifications(): Notification[] {
    return this.notifications;
  }

  createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: this.notifications.length + 1,
      read: false,
      createdAt: new Date()
    };

    this.notifications.push(newNotification);
    console.log('✅ Notification created via event:', newNotification);
    return newNotification;
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      console.log('✅ Notification marked as read:', notification);
    }
  }

  getUnreadCount(userId: number): number {
    return this.notifications.filter(n => n.userId === userId && !n.read).length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
