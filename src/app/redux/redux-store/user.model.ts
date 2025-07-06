export interface User {
    id?: number;
    name: string;
    age: number;
    email: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    selectedUser: User | null;
}