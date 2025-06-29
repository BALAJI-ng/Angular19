import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  age: number;
  city: string;
  country?: string;
  email?: string;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Balaji {
  name: string;
  age: number;
  city: string;
  skill?: string;
  country?: string;
  email?: string;
}

@Component({
  selector: 'app-spread-operator',
  imports: [CommonModule],
  templateUrl: './spread-operator.component.html',
  styleUrl: './spread-operator.component.scss'
})
export class SpreadOperatorComponent implements OnInit {

  // Custom Array Example (Your addition)
  myArray1: number[] = [1, 2, 3, 4, 5];

  // Basic Array Examples
  myOriginalArray = [1, 2, 3];
  myCopiedArray = [...this.myOriginalArray]; // [1, 2, 3]

  // Object Examples
  originalUser: User = { name: 'John', age: 30, city: 'New York' };
  copiedUser: User = { ...this.originalUser };
  updatedUser: User = { ...this.originalUser, age: 31, country: 'USA' };

  // Function Examples
  numbers = [1, 2, 3, 4, 5];
  maxNumber = Math.max(...this.numbers);

  // Complex Examples
  fruits = ['apple', 'banana'];
  vegetables = ['carrot', 'broccoli'];
  groceries = [...this.fruits, ...this.vegetables];

  // State Management Examples
  todos: Todo[] = [
    { id: 1, text: 'Learn Angular', completed: false },
    { id: 2, text: 'Learn TypeScript', completed: true }
  ];

  // Custom Examples (Your additions)
  myNumbers = [10, 5, 20, 15];
  findMax = Math.max(...this.myNumbers);

  oldBalaji: Balaji = {
    name: 'Balaji',
    age: 25,
    city: 'Chennai',
    country: 'India',
    email: 'balaji@example.com'
  }

  newBalaji: Balaji = { ...this.oldBalaji, age: 37, city: 'Chandler', country: 'USA', email: 'balaji.new@example.com' };

  // Custom Array Methods (Your additions)
  Increment() {
    this.myArray1 = [...this.myArray1, this.myArray1.length + 1];
  }

  decrement() {
    this.myArray1 = [...this.myArray1.slice(0, -1)];
  }

  reset() {
    this.myArray1 = [1, 2, 3, 4, 5];
  }

  // Custom Object Method (Your addition)
  addSkill() {
    this.newBalaji = { ...this.newBalaji, skill: 'Angular' };
  }

  ngOnInit(): void {
    console.log('=== Spread Operator Examples ===');
    console.log('Original Array:', this.myOriginalArray);
    console.log('Copied Array:', this.myCopiedArray);
    console.log('Original User:', this.originalUser);
    console.log('Updated User:', this.updatedUser);
    console.log('Max Number:', this.maxNumber);
    console.log('Groceries:', this.groceries);
  }

  // Array manipulation methods
  addToArray(): void {
    this.myOriginalArray = [...this.myOriginalArray, this.myOriginalArray.length + 1];
    this.myCopiedArray = [...this.myOriginalArray]; // Update copy
  }

  removeFromArray(): void {
    this.myOriginalArray = this.myOriginalArray.slice(0, -1);
    this.myCopiedArray = [...this.myOriginalArray]; // Update copy
  }

  resetArray(): void {
    this.myOriginalArray = [1, 2, 3];
    this.myCopiedArray = [...this.myOriginalArray];
  }

  // Object manipulation methods
  updateUserAge(): void {
    this.updatedUser = { ...this.updatedUser, age: this.updatedUser.age + 1 };
  }

  addUserProperty(): void {
    this.updatedUser = { ...this.updatedUser, email: 'john@example.com' };
  }

  resetUser(): void {
    this.updatedUser = { ...this.originalUser, age: 31, country: 'USA' };
  }

  // Todo management methods
  addTodo(): void {
    const newTodo = {
      id: this.todos.length + 1,
      text: `Task ${this.todos.length + 1}`,
      completed: false
    };
    this.todos = [...this.todos, newTodo];
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // Merge arrays example
  mergeArrays(): void {
    const newFruits = ['orange', 'grape'];
    this.fruits = [...this.fruits, ...newFruits];
    this.groceries = [...this.fruits, ...this.vegetables];
  }

  // Deep copy demonstration
  deepCopyExample(): any {
    const complexObject = {
      user: { ...this.originalUser },
      preferences: { theme: 'dark', language: 'en' },
      todos: this.todos.map(todo => ({ ...todo }))
    };
    return complexObject;
  }

  // Helper methods for template
  getCompletedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  getPendingCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  listOfEmployees: Employee[] = [
    { id: 1, name: 'Alice Johnson', position: 'Developer', department: 'IT', email: 'alice.johnson@example.com' },
    { id: 2, name: 'Bob Smith', position: 'Designer', department: 'Marketing', email: 'bob.smith@example.com' },
    { id: 3, name: 'Charlie Brown', position: 'Product Manager', department: 'Sales', email: 'charlie.brown@example.com' }
  ];

  addEmployee(): void {
    const newEmployee: Employee = {
      id: this.listOfEmployees.length + 1,
      name: `New Employee ${this.listOfEmployees.length + 1}`,
      position: 'New Position',
      department: 'New Department',
      email: `new.employee${this.listOfEmployees.length + 1}@example.com`
    };
    this.listOfEmployees = [...this.listOfEmployees, newEmployee];
  }

  deleteEmployee(id: number): void {
    this.listOfEmployees = this.listOfEmployees.filter(emp => emp.id !== id);
  }



  updateEmployee(id: number): void {
    this.listOfEmployees = this.listOfEmployees.map(emp =>
      emp.id === id ? { ...emp, position: 'Updated Position' } : emp
    );
  }

  tooggleEmployeeEmail(id: number): void {
    this.listOfEmployees = this.listOfEmployees.map(emp =>
      emp.id === id ? { ...emp, email: emp.email ? '' : `new.employee${emp.id}@example.com` } : emp
    );
  }



  listOfBofaEmployee: Bofa[]
    = [
      { id: 1, name1: "Balaji", email: "Balaji.bofa.com", courseCompleted: false },
      { id: 2, name1: "Stephen", email: "Stephen.bofa.com", courseCompleted: false }
    ]

  addEmployee1() {
    const newEmp = {
      id: this.listOfBofaEmployee.length + 1, name1: "Stephen" + this.listOfBofaEmployee.length + 1,
      email: "Stephen.bofa.com" + this.listOfBofaEmployee.length + 1, courseCompleted: false
    }
    this.listOfBofaEmployee = [...this.listOfBofaEmployee, newEmp]
  }

  updateEmployee1(id: number) {
    this.listOfBofaEmployee = this.listOfBofaEmployee.map(emp => emp.id === id ? { ...emp, courseCompleted: true } : emp);
  }



  deleteEmployee1(id: number) {
    this.listOfBofaEmployee = this.listOfBofaEmployee.filter(emp => emp.id !== id)
  }
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
}

interface Bofa {
  id: number,
  name1: string,
  email: string,
  courseCompleted: boolean
}
