import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, CreateUserRequest, UpdateUserRequest } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            mobile: '+1234567890',
            email: 'john.doe@example.com'
        },
        {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            mobile: '+1987654321',
            email: 'jane.smith@example.com'
        }
    ];

    private nextId = 3;

    getUsers(): Observable<User[]> {
        // Simulate API call with delay
        return of([...this.users]).pipe(delay(500));
    }

    createUser(userRequest: CreateUserRequest): Observable<User> {
        // Simulate email validation
        if (this.users.some(u => u.email === userRequest.email)) {
            return throwError(() => new Error('Email already exists'));
        }

        const newUser: User = {
            id: this.nextId.toString(),
            firstName: userRequest.firstName,
            lastName: userRequest.lastName,
            mobile: userRequest.mobile,
            email: userRequest.email
        };

        this.users.push(newUser);
        this.nextId++;

        return of(newUser).pipe(delay(500));
    }

    updateUser(userRequest: UpdateUserRequest): Observable<User> {
        const userIndex = this.users.findIndex(u => u.id === userRequest.id);

        if (userIndex === -1) {
            return throwError(() => new Error('User not found'));
        }

        // Check if email is taken by another user
        const emailExists = this.users.some(u => u.email === userRequest.email && u.id !== userRequest.id);
        if (emailExists) {
            return throwError(() => new Error('Email already exists'));
        }

        const updatedUser: User = {
            id: userRequest.id,
            firstName: userRequest.firstName,
            lastName: userRequest.lastName,
            mobile: userRequest.mobile,
            email: userRequest.email
        };

        this.users[userIndex] = updatedUser;

        return of(updatedUser).pipe(delay(500));
    }

    deleteUser(id: string): Observable<string> {
        const userIndex = this.users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return throwError(() => new Error('User not found'));
        }

        this.users.splice(userIndex, 1);

        return of(id).pipe(delay(500));
    }
}
