import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';

describe('UserService - Real Service Testing Examples', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default users', () => {
      const users = service.getUsers();
      expect(users).toBeDefined();
      expect(users.length).toBe(3); // Initial users from the service
    });

    it('should log initialization message', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // Create a new instance to test constructor logging
      new UserService();
      
      expect(consoleSpy).toHaveBeenCalledWith('🏗️ UserService initialized');
      consoleSpy.mockRestore();
    });
  });

  describe('User Retrieval Operations', () => {
    
    it('should get all users', () => {
      const users = service.getUsers();
      
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
      
      // Verify the structure of returned users
      users.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(typeof user.id).toBe('number');
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
      });
    });

    it('should get user by ID successfully', () => {
      const user = service.getUserById(1);
      
      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.name).toBe('John Doe');
      expect(user?.email).toBe('john@example.com');
    });

    it('should return undefined for non-existent user ID', () => {
      const user = service.getUserById(999);
      expect(user).toBeUndefined();
    });

    it('should handle edge cases for getUserById', () => {
      // Test with negative ID
      expect(service.getUserById(-1)).toBeUndefined();
      
      // Test with zero ID
      expect(service.getUserById(0)).toBeUndefined();
      
      // Test with valid IDs
      expect(service.getUserById(1)).toBeDefined();
      expect(service.getUserById(2)).toBeDefined();
      expect(service.getUserById(3)).toBeDefined();
    });
  });

  describe('User Creation Operations', () => {
    
    it('should create a new user successfully', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const initialUserCount = service.getUsers().length;
      
      const newUserData = {
        name: 'Alice Cooper',
        email: 'alice@example.com'
      };

      const createdUser = service.createUser(newUserData);

      // Verify the created user
      expect(createdUser).toBeDefined();
      expect(createdUser.id).toBe(initialUserCount + 1);
      expect(createdUser.name).toBe(newUserData.name);
      expect(createdUser.email).toBe(newUserData.email);

      // Verify user was added to the list
      const updatedUsers = service.getUsers();
      expect(updatedUsers.length).toBe(initialUserCount + 1);
      expect(updatedUsers).toContain(createdUser);

      // Verify console logging
      expect(consoleSpy).toHaveBeenCalledWith('👤 User created:', createdUser);
      
      consoleSpy.mockRestore();
    });

    it('should create multiple users with incremental IDs', () => {
      const initialCount = service.getUsers().length;
      
      const user1 = service.createUser({ name: 'User 1', email: 'user1@example.com' });
      const user2 = service.createUser({ name: 'User 2', email: 'user2@example.com' });
      
      expect(user1.id).toBe(initialCount + 1);
      expect(user2.id).toBe(initialCount + 2);
      expect(service.getUsers().length).toBe(initialCount + 2);
    });

    it('should preserve user data integrity when creating', () => {
      const originalUsers = service.getUsers();
      const originalData = originalUsers.map(u => ({ ...u })); // Deep copy
      
      service.createUser({ name: 'New User', email: 'new@example.com' });
      
      // Original users should remain unchanged
      originalUsers.slice(0, originalData.length).forEach((user, index) => {
        expect(user.id).toBe(originalData[index].id);
        expect(user.name).toBe(originalData[index].name);
        expect(user.email).toBe(originalData[index].email);
      });
    });
  });

  describe('User Update Operations', () => {
    
    it('should update user profile successfully', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const userId = 1;
      const originalUser = service.getUserById(userId);
      
      expect(originalUser).toBeDefined();
      
      const updates = {
        name: 'John Updated',
        email: 'john.updated@example.com'
      };

      service.updateUserProfile(userId, updates);

      const updatedUser = service.getUserById(userId);
      expect(updatedUser?.name).toBe(updates.name);
      expect(updatedUser?.email).toBe(updates.email);
      expect(updatedUser?.id).toBe(userId); // ID should remain unchanged

      // Verify console logging
      expect(consoleSpy).toHaveBeenCalledWith('📝 User updated:', updatedUser);
      
      consoleSpy.mockRestore();
    });

    it('should handle partial updates', () => {
      const userId = 2;
      const originalUser = service.getUserById(userId);
      const originalName = originalUser?.name;
      
      // Update only email
      service.updateUserProfile(userId, { email: 'newemail@example.com' });
      
      const updatedUser = service.getUserById(userId);
      expect(updatedUser?.email).toBe('newemail@example.com');
      expect(updatedUser?.name).toBe(originalName); // Name should remain unchanged
      expect(updatedUser?.id).toBe(userId);
    });

    it('should handle update for non-existent user', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // Try to update user that doesn't exist
      service.updateUserProfile(999, { name: 'Non-existent' });
      
      // Should not log anything since user doesn't exist
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Service State Management', () => {
    
    it('should maintain consistent state across operations', () => {
      const initialUsers = service.getUsers();
      const initialCount = initialUsers.length;
      
      // Create a user
      const newUser = service.createUser({ name: 'Test User', email: 'test@example.com' });
      expect(service.getUsers().length).toBe(initialCount + 1);
      
      // Update the user
      service.updateUserProfile(newUser.id, { name: 'Updated Test User' });
      const updatedUser = service.getUserById(newUser.id);
      expect(updatedUser?.name).toBe('Updated Test User');
      
      // Verify state consistency
      expect(service.getUsers().length).toBe(initialCount + 1);
      expect(service.getUsers()).toContain(updatedUser);
    });

    it('should return references to actual user objects', () => {
      const users1 = service.getUsers();
      const users2 = service.getUsers();
      
      // Should return the same array reference (not a copy)
      expect(users1).toBe(users2);
      
      // Modifications should be reflected immediately
      const user = service.getUserById(1);
      if (user) {
        user.name = 'Modified Name';
        expect(service.getUserById(1)?.name).toBe('Modified Name');
      }
    });
  });

  describe('Service Error Handling and Edge Cases', () => {
    
    it('should handle invalid input gracefully', () => {
      // Test createUser with empty strings
      const userWithEmptyName = service.createUser({ name: '', email: 'test@example.com' });
      expect(userWithEmptyName.name).toBe('');
      
      // Test updateUserProfile with empty updates
      const originalUser = service.getUserById(1);
      service.updateUserProfile(1, {});
      const unchangedUser = service.getUserById(1);
      expect(unchangedUser).toEqual(originalUser);
    });

    it('should handle special characters in user data', () => {
      const specialUser = service.createUser({
        name: 'João Müller-Schmidt',
        email: 'joão.müller@émáil.cöm'
      });
      
      expect(specialUser.name).toBe('João Müller-Schmidt');
      expect(specialUser.email).toBe('joão.müller@émáil.cöm');
      
      const retrievedUser = service.getUserById(specialUser.id);
      expect(retrievedUser?.name).toBe('João Müller-Schmidt');
    });
  });

  describe('Integration Testing Patterns', () => {
    
    it('should demonstrate complete user lifecycle', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      // 1. Create user
      const newUser = service.createUser({
        name: 'Lifecycle User',
        email: 'lifecycle@example.com'
      });
      expect(consoleSpy).toHaveBeenCalledWith('👤 User created:', newUser);
      
      // 2. Retrieve user
      const retrievedUser = service.getUserById(newUser.id);
      expect(retrievedUser).toEqual(newUser);
      
      // 3. Update user
      service.updateUserProfile(newUser.id, { 
        name: 'Updated Lifecycle User',
        email: 'updated.lifecycle@example.com'
      });
      expect(consoleSpy).toHaveBeenCalledWith('📝 User updated:', expect.objectContaining({
        id: newUser.id,
        name: 'Updated Lifecycle User',
        email: 'updated.lifecycle@example.com'
      }));
      
      // 4. Verify final state
      const finalUser = service.getUserById(newUser.id);
      expect(finalUser?.name).toBe('Updated Lifecycle User');
      expect(finalUser?.email).toBe('updated.lifecycle@example.com');
      expect(finalUser?.id).toBe(newUser.id);
      
      consoleSpy.mockRestore();
    });
  });
});
    });
  });

  describe('HTTP Operations', () => {
    
    describe('getUsers()', () => {
      it('should fetch users successfully', () => {
        const mockUsers: User[] = [
          { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 }
        ];

        service.getUsers().subscribe(users => {
          expect(users).toEqual(mockUsers);
          expect(users.length).toBe(2);
          expect(service.getUsersCount()).toBe(2);
        });

        const req = httpMock.expectOne('/api/users');
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);
      });

      it('should handle getUsers error', () => {
        service.getUsers().subscribe(users => {
          expect(users).toEqual([]);
        });

        const req = httpMock.expectOne('/api/users');
        req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
      });
    });

    describe('getUserById()', () => {
      it('should fetch user by ID successfully', () => {
        const mockUser: User = { id: 1, name: 'John Doe', email: 'john@example.com' };

        service.getUserById(1).subscribe(user => {
          expect(user).toEqual(mockUser);
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
      });

      it('should handle getUserById error', () => {
        service.getUserById(999).subscribe(user => {
          expect(user).toBeNull();
        });

        const req = httpMock.expectOne('/api/users/999');
        req.flush('User not found', { status: 404, statusText: 'Not Found' });
      });
    });

    describe('createUser()', () => {
      it('should create user successfully', () => {
        const newUser = { name: 'Bob Johnson', email: 'bob@example.com', age: 35 };
        const createdUser: User = { id: 3, ...newUser };

        service.createUser(newUser).subscribe(user => {
          expect(user).toEqual(createdUser);
          expect(user.id).toBe(3);
        });

        const req = httpMock.expectOne('/api/users');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newUser);
        req.flush(createdUser);
      });

      it('should handle createUser error', () => {
        const newUser = { name: 'Invalid User', email: 'invalid-email' };

        service.createUser(newUser).subscribe({
          next: () => fail('Should have failed'),
          error: (error) => {
            expect(error).toBeDefined();
          }
        });

        const req = httpMock.expectOne('/api/users');
        req.flush('Validation error', { status: 400, statusText: 'Bad Request' });
      });
    });

    describe('updateUser()', () => {
      it('should update user successfully', () => {
        // First, populate the service with initial users
        const initialUsers: User[] = [
          { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 }
        ];
        
        service.getUsers().subscribe();
        const getReq = httpMock.expectOne('/api/users');
        getReq.flush(initialUsers);

        // Now test the update
        const updatedData = { name: 'John Updated', age: 31 };
        const updatedUser: User = { id: 1, name: 'John Updated', email: 'john@example.com', age: 31 };

        service.updateUser(1, updatedData).subscribe(user => {
          expect(user).toEqual(updatedUser);
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updatedData);
        req.flush(updatedUser);
      });
    });

    describe('deleteUser()', () => {
      it('should delete user successfully', () => {
        service.deleteUser(1).subscribe(result => {
          expect(result).toBe(true);
        });

        const req = httpMock.expectOne('/api/users/1');
        expect(req.request.method).toBe('DELETE');
        req.flush({});
      });

      it('should handle deleteUser error', () => {
        service.deleteUser(999).subscribe(result => {
          expect(result).toBe(false);
        });

        const req = httpMock.expectOne('/api/users/999');
        req.flush('User not found', { status: 404, statusText: 'Not Found' });
      });
    });
  });

  describe('Validation Methods', () => {
    
    describe('validateUser()', () => {
      it('should validate user with all required fields', () => {
        const validUser = {
          name: 'John Doe',
          email: 'john@example.com',
          age: 30
        };

        const result = service.validateUser(validUser);
        
        expect(result.valid).toBe(true);
        expect(result.errors).toEqual([]);
      });

      it('should return errors for missing name', () => {
        const invalidUser = {
          email: 'john@example.com',
          age: 30
        };

        const result = service.validateUser(invalidUser);
        
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Name is required');
      });

      it('should return errors for invalid email', () => {
        const invalidUser = {
          name: 'John Doe',
          email: 'invalid-email',
          age: 30
        };

        const result = service.validateUser(invalidUser);
        
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Valid email is required');
      });

      it('should return errors for negative age', () => {
        const invalidUser = {
          name: 'John Doe',
          email: 'john@example.com',
          age: -5
        };

        const result = service.validateUser(invalidUser);
        
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Age must be a positive number');
      });

      it('should return multiple errors for multiple invalid fields', () => {
        const invalidUser = {
          name: '',
          email: 'invalid-email',
          age: -1
        };

        const result = service.validateUser(invalidUser);
        
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBe(3);
        expect(result.errors).toContain('Name is required');
        expect(result.errors).toContain('Valid email is required');
        expect(result.errors).toContain('Age must be a positive number');
      });
    });
  });

  describe('State Management', () => {
    
    it('should manage users state correctly', () => {
      const mockUsers: User[] = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ];

      // Initially empty
      expect(service.getUsersCount()).toBe(0);

      // After fetching users
      service.getUsers().subscribe();
      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);

      expect(service.getUsersCount()).toBe(2);
    });

    it('should clear users', () => {
      // First add some users
      const mockUsers: User[] = [
        { id: 1, name: 'John', email: 'john@example.com' }
      ];

      service.getUsers().subscribe();
      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);

      expect(service.getUsersCount()).toBe(1);

      // Clear users
      service.clearUsers();
      expect(service.getUsersCount()).toBe(0);
    });

    it('should emit users observable updates', () => {
      const mockUsers: User[] = [
        { id: 1, name: 'John', email: 'john@example.com' }
      ];

      let emittedUsers: User[] = [];
      service.users$.subscribe(users => {
        emittedUsers = users;
      });

      service.getUsers().subscribe();
      const req = httpMock.expectOne('/api/users');
      req.flush(mockUsers);

      expect(emittedUsers).toEqual(mockUsers);
    });
  });

  describe('Error Handling & Console Logging', () => {
    
    it('should log errors to console', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      service.getUsers().subscribe();
      const req = httpMock.expectOne('/api/users');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching users:', expect.any(Object));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Integration Tests', () => {
    
    it('should perform full CRUD cycle', () => {
      // 1. Start with empty users
      expect(service.getUsersCount()).toBe(0);

      // 2. Create a user
      const newUser = { name: 'Test User', email: 'test@example.com', age: 25 };
      const createdUser: User = { id: 1, ...newUser };

      service.createUser(newUser).subscribe();
      const createReq = httpMock.expectOne('/api/users');
      createReq.flush(createdUser);

      // 3. Update the user
      const updateData = { name: 'Updated User' };
      const updatedUser: User = { ...createdUser, name: 'Updated User' };

      service.updateUser(1, updateData).subscribe();
      const updateReq = httpMock.expectOne('/api/users/1');
      updateReq.flush(updatedUser);

      // 4. Delete the user
      service.deleteUser(1).subscribe(result => {
        expect(result).toBe(true);
      });
      const deleteReq = httpMock.expectOne('/api/users/1');
      deleteReq.flush({});
    });
  });
});
