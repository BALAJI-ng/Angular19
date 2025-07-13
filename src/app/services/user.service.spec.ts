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
        expect(user.id).toBeDefined();
        expect(user.name).toBeDefined();
        expect(user.email).toBeDefined();
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
      expect(updatedUsers.includes(createdUser)).toBe(true);

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
      expect(service.getUsers().includes(updatedUser!)).toBe(true);
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
      
      // 4. Verify final state
      const finalUser = service.getUserById(newUser.id);
      expect(finalUser?.name).toBe('Updated Lifecycle User');
      expect(finalUser?.email).toBe('updated.lifecycle@example.com');
      expect(finalUser?.id).toBe(newUser.id);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Jest Service Testing Patterns Demo', () => {
    
    it('should demonstrate Jest mock functions', () => {
      // Create mock functions
      const mockCallback = jest.fn();
      const mockWithReturn = jest.fn().mockReturnValue('mocked result');
      const mockAsync = jest.fn().mockResolvedValue({ success: true });

      // Test mock function behavior
      mockCallback('test argument');
      expect(mockCallback).toHaveBeenCalledWith('test argument');
      expect(mockCallback).toHaveBeenCalledTimes(1);

      // Test return value
      expect(mockWithReturn()).toBe('mocked result');
    });

    it('should demonstrate spying on service methods', () => {
      const getUsersSpy = jest.spyOn(service, 'getUsers');
      const createUserSpy = jest.spyOn(service, 'createUser');

      // Call service methods
      service.getUsers();
      service.createUser({ name: 'Spy Test', email: 'spy@test.com' });

      // Verify spies were called
      expect(getUsersSpy).toHaveBeenCalled();
      expect(createUserSpy).toHaveBeenCalledWith({ name: 'Spy Test', email: 'spy@test.com' });

      // Clean up spies
      getUsersSpy.mockRestore();
      createUserSpy.mockRestore();
    });

    it('should demonstrate mock implementation', () => {
      const mockService = {
        validateUser: jest.fn().mockImplementation((user: Partial<User>) => {
          if (!user.name || user.name.length < 2) {
            return { valid: false, errors: ['Name too short'] };
          }
          if (!user.email || !user.email.includes('@')) {
            return { valid: false, errors: ['Invalid email'] };
          }
          return { valid: true, errors: [] };
        })
      };

      // Test the mock implementation
      expect(mockService.validateUser({ name: 'A', email: 'test@example.com' }))
        .toEqual({ valid: false, errors: ['Name too short'] });
      
      expect(mockService.validateUser({ name: 'John', email: 'invalid-email' }))
        .toEqual({ valid: false, errors: ['Invalid email'] });
      
      expect(mockService.validateUser({ name: 'John', email: 'john@example.com' }))
        .toEqual({ valid: true, errors: [] });
    });
  });
});
