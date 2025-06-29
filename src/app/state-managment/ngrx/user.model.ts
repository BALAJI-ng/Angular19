export interface User {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password?: string; // Optional for security reasons when displaying
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
}

export interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}
