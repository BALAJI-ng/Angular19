import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { UserForm } from './store';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: Date;
}


@Injectable({
  providedIn: 'root'
})
export class RxjsMockService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Dummy API
  private mockApiUrl = 'http://localhost:3000/api/users'; // Mock local API

  constructor(private http: HttpClient) { }

  // Real API call (using JSONPlaceholder for demo)
  createUser(userData: UserForm): Observable<ApiResponse<any>> {
    return this.http.post<any>(this.apiUrl, userData).pipe(
      // Transform response to match our ApiResponse interface
    );
  }

  // Mock API call for demonstration
  createUserMock(userData: UserForm): Observable<ApiResponse<UserForm>> {
    // Simulate API delay
    const mockResponse: ApiResponse<UserForm> = {
      success: true,
      message: 'User created successfully!',
      data: {
        ...userData,
        id: Math.floor(Math.random() * 1000) // Generate random ID
      },
      timestamp: new Date()
    };

    // Simulate network delay
    return of(mockResponse).pipe(delay(1500));
  }

  // Get all users (for demo)
  getUsers(): Observable<ApiResponse<UserForm[]>> {
    const mockUsers: UserForm[] = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
    ];

    const mockResponse: ApiResponse<UserForm[]> = {
      success: true,
      message: 'Users retrieved successfully!',
      data: mockUsers,
      timestamp: new Date()
    };

    return of(mockResponse).pipe(delay(1000));
  }

  // Update user
  updateUser(userData: UserForm): Observable<ApiResponse<UserForm>> {
    const mockResponse: ApiResponse<UserForm> = {
      success: true,
      message: 'User updated successfully!',
      data: userData,
      timestamp: new Date()
    };

    return of(mockResponse).pipe(delay(1200));
  }

  // Delete user
  deleteUser(email: string): Observable<ApiResponse<boolean>> {
    const mockResponse: ApiResponse<boolean> = {
      success: true,
      message: 'User deleted successfully!',
      data: true,
      timestamp: new Date()
    };

    return of(mockResponse).pipe(delay(800));
  }
}
