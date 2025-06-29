import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { UserServiceFixed } from '../services/user-fixed.service';
import { OrderServiceFixed } from '../services/order-fixed.service';
import { NotificationServiceFixed } from '../services/notification-fixed.service';
import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'app-circular-dependency-demo',
  imports: [CommonModule],
  templateUrl: './circular-dependency-demo.component.html',
  styleUrl: './circular-dependency-demo.component.scss'
})
export class CircularDependencyDemoComponent implements OnInit {

  // Problematic services (with circular dependencies)
  users: any[] = [];
  orders: any[] = [];
  notifications: any[] = [];

  // Fixed services (without circular dependencies)
  usersFixed: any[] = [];
  ordersFixed: any[] = [];
  notificationsFixed: any[] = [];

  events: any[] = [];
  selectedUserId = 1;

  constructor(
    // Problematic services - commented out to avoid actual circular dependency errors
    // private userService: UserService,
    // private orderService: OrderService,  
    // private notificationService: NotificationService,

    // Fixed services
    private userServiceFixed: UserServiceFixed,
    private orderServiceFixed: OrderServiceFixed,
    private notificationServiceFixed: NotificationServiceFixed,
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.loadFixedData();
    this.subscribeToEvents();
  }

  private loadFixedData(): void {
    this.usersFixed = this.userServiceFixed.getUsers();
    this.ordersFixed = this.orderServiceFixed.getOrders();
    this.notificationsFixed = this.notificationServiceFixed.getAllNotifications();
  }

  private subscribeToEvents(): void {
    this.eventBus.subscribe().subscribe(event => {
      if (event) {
        this.events = [event, ...this.events].slice(0, 10); // Keep last 10 events
        // Refresh data after events
        setTimeout(() => {
          this.loadFixedData();
        }, 100);
      }
    });
  }

  // Demo actions for fixed services
  createUserFixed(): void {
    const randomNames = ['Alice Cooper', 'David Bowie', 'Prince Rogers', 'Madonna Ciccone'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const email = randomName.toLowerCase().replace(' ', '.') + '@example.com';

    this.userServiceFixed.createUser({
      name: randomName,
      email: email
    });
  }

  createOrderFixed(): void {
    const items = [
      ['Gaming Chair', 'Desk Lamp'],
      ['Mechanical Keyboard', 'Gaming Mouse'],
      ['Monitor', 'Webcam'],
      ['Speakers', 'Headphones']
    ];
    const randomItems = items[Math.floor(Math.random() * items.length)];
    const total = Math.floor(Math.random() * 1000) + 100;

    this.orderServiceFixed.createOrder({
      userId: this.selectedUserId,
      items: randomItems,
      total: total,
      status: 'pending'
    });
  }

  updateOrderStatusFixed(): void {
    const orders = this.orderServiceFixed.getOrders();
    if (orders.length > 0) {
      const randomOrder = orders[Math.floor(Math.random() * orders.length)];
      const statuses = ['processing', 'shipped', 'delivered'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)] as any;

      this.orderServiceFixed.updateOrderStatus(randomOrder.id, newStatus);
    }
  }

  updateUserProfileFixed(): void {
    const users = this.userServiceFixed.getUsers();
    if (users.length > 0) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newName = randomUser.name + ' (Updated)';

      this.userServiceFixed.updateUserProfile(randomUser.id, {
        name: newName
      });
    }
  }

  clearEvents(): void {
    this.events = [];
  }

  getNotificationsForUser(userId: number): any[] {
    return this.notificationsFixed.filter((n: any) => n.userId === userId);
  }

  formatEventType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }
}
