import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Status = 'success' | 'error' | 'idle' | 'locading';
type Theme = 'dark' | 'light' | 'auto';
type UserRole = 'admin' | 'user' | 'guest';
type StringOrNumber = string | number;
type ID = string | number;
type ApiResponse =
  | { status: 'success', message: 'This is success', data: any }
  | { status: 'failure', message: 'This is error', errorCode: number }
  | { status: 'loading'; progress: number };

interface User {
  id: ID;
  name: string;
  role: UserRole;
}

@Component({
  selector: 'app-union-try',
  imports: [CommonModule],
  templateUrl: './union-try.component.html',
  styleUrl: './union-try.component.scss'
})

export class UnionTryComponent {

  currentStatus: Status = 'idle';
  currentTheme: Theme = 'dark';
  currentUseRole: UserRole = 'user'
  userId: StringOrNumber = 123;
  productId: StringOrNumber = 'prod-456';

  statusHistory: Status[] = ['success', 'error', 'idle', 'locading']

  user: User = {
    id: 1,
    name: "Balaji",
    role: 'user'
  }

  apiResponse: ApiResponse[] = [
    { status: 'loading', progress: 50 },
    { status: 'failure', message: 'This is error', errorCode: 500, },
    { status: 'success', message: 'This is success', data: 'asd' }
  ]
  //typeguardFunction
  someMethod(id: StringOrNumber): id is string {
    return typeof id === 'string';
  }



}
