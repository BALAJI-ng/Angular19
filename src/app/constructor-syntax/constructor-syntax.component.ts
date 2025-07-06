import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//traditional Constructor

class TraditionalPerson1 {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name} age is ${this.age}`;
  }
}



class moderConstructor {
  constructor(public name: string, public age: number) { }

  getinfor() {
    return `${this.name} age is ${this.age}`
  }
}

// Interface definitions
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

class AssignVariable {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  constructorMethod() {
    return `${this.name} age is ${this.age}`
  }
}

// Class examples with different constructor syntax

// 1. Traditional Constructor Syntax
class TraditionalPerson {
  private name: string;
  private age: number;
  private email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  getInfo(): string {
    return `${this.name} (${this.age}) - ${this.email}`;
  }
}

// 2. Parameter Properties (Shorthand)
class ModernPerson {
  constructor(
    private name: string,
    private age: number,
    public email: string,
    protected readonly id: string
  ) { }

  getInfo(): string {
    return `${this.name} (${this.age}) - ${this.email}`;
  }

  getId(): string {
    return this.id;
  }
}

// 3. Optional Parameters
class PersonWithOptionals {
  constructor(
    private name: string,
    private age: number = 0,
    private email?: string,
    private address?: Address
  ) { }

  getFullInfo(): string {
    let info = `${this.name} (${this.age})`;
    if (this.email) info += ` - ${this.email}`;
    if (this.address) info += ` - ${this.address.city}`;
    return info;
  }
}

// 4. Constructor Overloading (using union types)
class FlexiblePerson {
  private name: string;
  private age: number;
  private contact: ContactInfo;

  constructor(name: string, age: number, contact: ContactInfo);
  constructor(name: string, age: number, email: string, phone: string);
  constructor(
    name: string,
    age: number,
    contactOrEmail: ContactInfo | string,
    phone?: string
  ) {
    this.name = name;
    this.age = age;

    if (typeof contactOrEmail === 'string' && phone) {
      this.contact = { email: contactOrEmail, phone };
    } else if (typeof contactOrEmail === 'object') {
      this.contact = contactOrEmail;
    } else {
      throw new Error('Invalid constructor parameters');
    }
  }

  getContactInfo(): ContactInfo {
    return this.contact;
  }
}

// 5. Constructor with Dependency Injection Pattern
class Service {
  getName(): string {
    return 'UserService';
  }
}

class Controller {
  constructor(private service: Service) { }

  execute(): string {
    return `Executing with ${this.service.getName()}`;
  }
}

// 6. Generic Constructor
class Repository<T> {
  private items: T[] = [];

  constructor(private entityName: string, initialItems?: T[]) {
    if (initialItems) {
      this.items = [...initialItems];
    }
  }

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }

  getEntityName(): string {
    return this.entityName;
  }
}

// 7. Abstract Class Constructor
abstract class Vehicle {
  protected constructor(
    protected brand: string,
    protected year: number
  ) { }

  abstract getType(): string;

  getInfo(): string {
    return `${this.brand} (${this.year}) - ${this.getType()}`;
  }
}

class myClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  constructorMethod() {
    return `${this.name} age is222 ${this.age}`
  }
}

class Car extends Vehicle {
  constructor(
    brand: string,
    year: number,
    private doors: number
  ) {
    super(brand, year);
  }

  getType(): string {
    return `Car with ${this.doors} doors`;
  }
}

@Component({
  selector: 'app-constructor-syntax',
  imports: [CommonModule],
  templateUrl: './constructor-syntax.component.html',
  styleUrl: './constructor-syntax.component.scss'
})
export class ConstructorSyntaxComponent implements OnInit {
  // Example instances
  traditionalPerson!: TraditionalPerson;
  modernPerson!: ModernPerson;
  personWithOptionals!: PersonWithOptionals;
  flexiblePerson!: FlexiblePerson;
  controller!: Controller;
  userRepository!: Repository<string>;
  car!: Car;
  currentInstance: any;
  assignVariable!: AssignVariable

  // Constructor examples for display
  constructorExamples = [
    {
      title: 'Traditional Constructor',
      description: 'Explicit property declarations and assignments',
      code: `class TraditionalPerson {
  private name: string;
  private age: number;
  private email: string;
  
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}`
    },
    {
      title: 'Parameter Properties (Shorthand)',
      description: 'Automatic property creation and assignment',
      code: `class ModernPerson {
  constructor(
    private name: string,
    private age: number,
    public email: string,
    protected readonly id: string
  ) {}
}`
    },
    {
      title: 'Optional Parameters',
      description: 'Default values and optional parameters',
      code: `class PersonWithOptionals {
  constructor(
    private name: string,
    private age: number = 0,
    private email?: string,
    private address?: Address
  ) {}
}`
    },
    {
      title: 'Constructor Overloading',
      description: 'Multiple constructor signatures',
      code: `class FlexiblePerson {
  constructor(name: string, age: number, contact: ContactInfo);
  constructor(name: string, age: number, email: string, phone: string);
  constructor(
    name: string, 
    age: number, 
    contactOrEmail: ContactInfo | string, 
    phone?: string
  ) {
    // Implementation logic
  }
}`
    }
  ];

  ngOnInit(): void {
    // this.currentInstance = "User" + Math.random()
  }
  CallMethod() {
    this.currentInstance = "User" + Math.random()
  }



  constructor() {
    this.initializeExamples();
  }

  private initializeExamples(): void {
    // 1. Traditional Constructor
    this.traditionalPerson = new TraditionalPerson('John Doe', 30, 'john@example.com');

    // 2. Parameter Properties
    this.modernPerson = new ModernPerson('Jane Smith', 25, 'jane@example.com', 'user-123');

    // 3. Optional Parameters
    this.personWithOptionals = new PersonWithOptionals(
      'Bob Johnson',
      35,
      'bob@example.com',
      { street: '123 Main St', city: 'New York', zipCode: '10001' }
    );

    // 4. Constructor Overloading
    this.flexiblePerson = new FlexiblePerson(
      'Alice Brown',
      28,
      { email: 'alice@example.com', phone: '+1-555-0123' }
    );

    // 5. Dependency Injection
    const service = new Service();
    this.controller = new Controller(service);

    // 6. Generic Constructor
    this.userRepository = new Repository<string>('User', ['user1', 'user2']);

    // 7. Inheritance
    this.car = new Car('Toyota', 2023, 4);

    console.log('=== Constructor Syntax Examples ===');
    this.demonstrateConstructors();
  }

  private demonstrateConstructors(): void {
    console.log('1. Traditional:', this.traditionalPerson.getInfo());
    console.log('2. Modern:', this.modernPerson.getInfo());
    console.log('3. Optional:', this.personWithOptionals.getFullInfo());
    console.log('4. Flexible:', this.flexiblePerson.getContactInfo());
    console.log('5. DI Pattern:', this.controller.execute());
    console.log('6. Generic:', this.userRepository.getEntityName(), this.userRepository.getAll());
    console.log('7. Inheritance:', this.car.getInfo());
  }

  // Methods for template interaction
  createTraditionalPerson(): void {
    this.traditionalPerson = new TraditionalPerson(
      `User ${Date.now()}`,
      Math.floor(Math.random() * 50) + 18,
      `user${Date.now()}@example.com`
    );
  }

  createModernPerson(): void {
    this.modernPerson = new ModernPerson(
      `Modern User ${Date.now()}`,
      Math.floor(Math.random() * 40) + 20,
      `modern${Date.now()}@example.com`,
      `id-${Date.now()}`
    );
  }

  addUserToRepository(): void {
    const newUser = `user-${Date.now()}`;
    this.userRepository.add(newUser);
  }

  createNewCar(): void {
    const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const randomYear = 2020 + Math.floor(Math.random() * 4);
    const randomDoors = Math.random() > 0.5 ? 2 : 4;

    this.car = new Car(randomBrand, randomYear, randomDoors);
  }

  // Helper methods for template
  getPersonInfo(person: any): string {
    if (person && typeof person.getInfo === 'function') {
      return person.getInfo();
    }
    return 'No info available';
  }

  getPersonFullInfo(person: any): string {
    if (person && typeof person.getFullInfo === 'function') {
      return person.getFullInfo();
    }
    return 'No info available';
  }

  getRepositoryInfo(): { name: string; count: number; items: string[] } {
    return {
      name: this.userRepository.getEntityName(),
      count: this.userRepository.getAll().length,
      items: this.userRepository.getAll()
    };
  }

  trigger() {
    this.assignVariable = new AssignVariable("Balaji", 25)

  }
}
