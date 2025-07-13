# 🧪 Jest Service Testing Guide for Angular

## 📋 **Service Testing Patterns**

### **1. Testing Injected Services (Dependencies)**

```typescript
describe("Component with Service Dependencies", () => {
  let component: MyComponent;
  let mockService: jasmine.SpyObj<MyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("MyService", ["getData", "saveData"]);

    TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [{ provide: MyService, useValue: spy }],
    });

    mockService = TestBed.inject(MyService) as jasmine.SpyObj<MyService>;
  });

  it("should call service method", () => {
    mockService.getData.and.returnValue(of({ data: "test" }));
    component.loadData();
    expect(mockService.getData).toHaveBeenCalled();
  });
});
```

### **2. Jest Mocking Patterns**

#### **A. Simple Method Mocking**

```typescript
it("should mock service method", () => {
  const mockService = {
    getData: jest.fn().mockReturnValue("mocked data"),
    saveData: jest.fn().mockReturnValue(true),
  };

  expect(mockService.getData()).toBe("mocked data");
  expect(mockService.getData).toHaveBeenCalled();
});
```

#### **B. Promise/Observable Mocking**

```typescript
it("should mock async service", async () => {
  const mockService = {
    fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "John" }),
    deleteUser: jest.fn().mockRejectedValue(new Error("Delete failed")),
  };

  const user = await mockService.fetchUser();
  expect(user).toEqual({ id: 1, name: "John" });
});
```

#### **C. Spying on Existing Methods**

```typescript
it("should spy on console.log", () => {
  const consoleSpy = jest.spyOn(console, "log").mockImplementation();

  component.logMessage("test");

  expect(consoleSpy).toHaveBeenCalledWith("test");
  consoleSpy.mockRestore(); // Always clean up!
});
```

### **3. Testing HTTP Services**

```typescript
describe("HTTP Service Testing", () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it("should fetch users", () => {
    const mockUsers = [{ id: 1, name: "John" }];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne("/api/users");
    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);
  });

  it("should handle HTTP errors", () => {
    service.getUsers().subscribe({
      next: () => fail("Should have failed"),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne("/api/users");
    req.flush("Not found", { status: 404, statusText: "Not Found" });
  });
});
```

### **4. Service Testing Best Practices**

#### **A. Complete Service Test Example**

```typescript
// user.service.spec.ts
describe("UserService", () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe("CRUD Operations", () => {
    it("should create user", () => {
      const newUser = { name: "John", email: "john@example.com" };
      const createdUser = { id: 1, ...newUser };

      service.createUser(newUser).subscribe((user) => {
        expect(user).toEqual(createdUser);
      });

      const req = httpMock.expectOne("/api/users");
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(newUser);
      req.flush(createdUser);
    });

    it("should update user", () => {
      const updatedUser = { id: 1, name: "Jane", email: "jane@example.com" };

      service.updateUser(1, updatedUser).subscribe((user) => {
        expect(user).toEqual(updatedUser);
      });

      const req = httpMock.expectOne("/api/users/1");
      expect(req.request.method).toBe("PUT");
      req.flush(updatedUser);
    });

    it("should delete user", () => {
      service.deleteUser(1).subscribe((result) => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne("/api/users/1");
      expect(req.request.method).toBe("DELETE");
      req.flush({});
    });
  });
});
```

#### **B. Testing Service with Dependencies**

```typescript
describe("UserService with Logger", () => {
  let service: UserService;
  let mockLogger: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    const loggerSpy = jasmine.createSpyObj("LoggerService", ["log", "error"]);

    TestBed.configureTestingModule({
      providers: [UserService, { provide: LoggerService, useValue: loggerSpy }],
    });

    service = TestBed.inject(UserService);
    mockLogger = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it("should log when creating user", () => {
    const user = { name: "John", email: "john@example.com" };

    service.createUser(user);

    expect(mockLogger.log).toHaveBeenCalledWith("Creating user: John");
  });
});
```

### **5. Advanced Jest Mocking**

#### **A. Mock Implementation**

```typescript
it("should use custom mock implementation", () => {
  const mockService = {
    processData: jest.fn().mockImplementation((data) => {
      return data.toUpperCase();
    }),
  };

  expect(mockService.processData("hello")).toBe("HELLO");
});
```

#### **B. Mock Return Values Based on Parameters**

```typescript
it("should return different values based on input", () => {
  const mockService = {
    getUser: jest.fn().mockReturnValueOnce({ id: 1, name: "John" }).mockReturnValueOnce({ id: 2, name: "Jane" }).mockReturnValue({ id: 0, name: "Default" }),
  };

  expect(mockService.getUser()).toEqual({ id: 1, name: "John" });
  expect(mockService.getUser()).toEqual({ id: 2, name: "Jane" });
  expect(mockService.getUser()).toEqual({ id: 0, name: "Default" });
});
```

#### **C. Conditional Mocking**

```typescript
it("should mock based on conditions", () => {
  const mockService = {
    validateUser: jest.fn().mockImplementation((user) => {
      if (user.age >= 18) {
        return { valid: true, message: "Valid user" };
      }
      return { valid: false, message: "User too young" };
    }),
  };

  expect(mockService.validateUser({ age: 20 })).toEqual({
    valid: true,
    message: "Valid user",
  });

  expect(mockService.validateUser({ age: 16 })).toEqual({
    valid: false,
    message: "User too young",
  });
});
```

### **6. Testing Service State and Side Effects**

```typescript
describe("Service State Testing", () => {
  let service: StateService;

  beforeEach(() => {
    service = new StateService();
  });

  it("should maintain state correctly", () => {
    expect(service.getCount()).toBe(0);

    service.increment();
    expect(service.getCount()).toBe(1);

    service.increment();
    expect(service.getCount()).toBe(2);

    service.reset();
    expect(service.getCount()).toBe(0);
  });

  it("should emit events on state change", () => {
    const emitSpy = jest.spyOn(service.stateChanged, "emit");

    service.updateState({ key: "value" });

    expect(emitSpy).toHaveBeenCalledWith({ key: "value" });
  });
});
```

### **7. Common Jest Service Testing Patterns Summary**

| Pattern                  | Use Case                | Example                                    |
| ------------------------ | ----------------------- | ------------------------------------------ |
| `jest.fn()`              | Create mock function    | `const mockFn = jest.fn()`                 |
| `jest.spyOn()`           | Spy on existing method  | `jest.spyOn(service, 'method')`            |
| `mockReturnValue()`      | Return specific value   | `mockFn.mockReturnValue('test')`           |
| `mockResolvedValue()`    | Return resolved promise | `mockFn.mockResolvedValue(data)`           |
| `mockRejectedValue()`    | Return rejected promise | `mockFn.mockRejectedValue(error)`          |
| `mockImplementation()`   | Custom mock logic       | `mockFn.mockImplementation(() => {})`      |
| `toHaveBeenCalled()`     | Verify method called    | `expect(mockFn).toHaveBeenCalled()`        |
| `toHaveBeenCalledWith()` | Verify called with args | `expect(mockFn).toHaveBeenCalledWith(arg)` |

### **🎯 Key Takeaways**

1. **Always mock external dependencies**
2. **Test both success and error scenarios**
3. **Clean up spies with `mockRestore()`**
4. **Use `HttpClientTestingModule` for HTTP services**
5. **Test service state changes and side effects**
6. **Verify method calls and parameters**
7. **Use descriptive test names**

This guide covers all the essential patterns for testing services in Jest with Angular! 🚀
