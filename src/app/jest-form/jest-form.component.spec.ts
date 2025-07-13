import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JestFormComponent } from './jest-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('JestFormComponent', () => {
  let component: JestFormComponent;
  let fixture: ComponentFixture<JestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JestFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(JestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //set empty values for form controls
  it('should be invalid when form controls are empty', () => {
    component.userForm.patchValue({
      name: '',
      email: '',
      age: '',
    });

    expect(component.userForm.valid).toBe(false);
  });

  //set valid values for form controls
  it('should be valid when form controls have valid values', () => {
    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    });

    expect(component.userForm.valid).toBe(true);
  });

  //submit form with valid values
  it('should submit form with valid values', () => {
    // Spy on the onSubmit method to verify it gets called
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');

    component.userForm.patchValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
    });

    expect(component.userForm.valid).toBe(true);

    // Call onSubmit and verify it was called
    component.onSubmit();
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  //test individual form field validations
  it('should validate name field as required', () => {
    const nameControl = component.userForm.get('name');

    nameControl?.setValue('');
    expect(nameControl?.hasError('required')).toBe(true);

    nameControl?.setValue('John Doe');
    expect(nameControl?.hasError('required')).toBe(false);
  });

  it('should validate email field format', () => {
    const emailControl = component.userForm.get('email');

    // Test invalid email
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);

    // Test valid email
    emailControl?.setValue('john.doe@example.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });

  it('should validate age field as required and minimum value', () => {
    const ageControl = component.userForm.get('age');

    // Test empty age
    ageControl?.setValue('');
    expect(ageControl?.hasError('required')).toBe(true);

    // Test age below minimum (min is 0, so -1 should fail)
    ageControl?.setValue(-1);
    expect(ageControl?.hasError('min')).toBe(true);

    // Test valid age (0 and above are valid)
    ageControl?.setValue(0);
    expect(ageControl?.hasError('required')).toBe(false);
    expect(ageControl?.hasError('min')).toBe(false);

    ageControl?.setValue(25);
    expect(ageControl?.hasError('required')).toBe(false);
    expect(ageControl?.hasError('min')).toBe(false);
  });

  //test services or methods if any
  describe('Service Testing Examples', () => {
    // Test 1: Testing FormBuilder service (injected dependency)
    it('should test FormBuilder service dependency', () => {
      // FormBuilder is injected into the component, we can verify it's working
      expect(component.userForm).toBeDefined();
      expect(component.userForm.get('name')).toBeDefined();
      expect(component.userForm.get('email')).toBeDefined();
      expect(component.userForm.get('age')).toBeDefined();
    });

    // Test 2: Testing component methods that call services
    it('should test markFormGroupTouched method', () => {
      // Set up form with invalid data
      component.userForm.patchValue({
        name: '',
        email: '',
        age: '',
      });

      // Initially, controls should not be touched
      expect(component.userForm.get('name')?.touched).toBe(false);
      expect(component.userForm.get('email')?.touched).toBe(false);
      expect(component.userForm.get('age')?.touched).toBe(false);

      // Call onSubmit which internally calls markFormGroupTouched
      component.onSubmit();

      // After calling onSubmit with invalid form, all controls should be touched
      expect(component.userForm.get('name')?.touched).toBe(true);
      expect(component.userForm.get('email')?.touched).toBe(true);
      expect(component.userForm.get('age')?.touched).toBe(true);
    });

    // Test 3: Spying on console.log (testing side effects)
    it('should call console.log when form is submitted successfully', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.userForm.patchValue({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      });

      component.onSubmit();

      expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
      });

      consoleSpy.mockRestore(); // Clean up the spy
    });

    // Test 4: Testing submitForm method
    it('should test submitForm method with valid data', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.userForm.patchValue({
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
      });

      component.submitForm();

      expect(consoleSpy).toHaveBeenCalledWith('Form Submitted!', {
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
      });

      consoleSpy.mockRestore();
    });

    it('should test submitForm method with invalid data', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.userForm.patchValue({
        name: '',
        email: 'invalid-email',
        age: '',
      });

      component.submitForm();

      expect(consoleSpy).toHaveBeenCalledWith('Form is invalid');
      consoleSpy.mockRestore();
    });
  });

  // Example of testing a custom service (if you had one)
  describe('Custom Service Testing Pattern', () => {
    // This is an example of how you would test a custom service
    it('should demonstrate service mocking pattern', () => {
      // Example: If you had a UserService injected into your component

      // 1. Create a mock service
      const mockUserService = {
        saveUser: jest
          .fn()
          .mockReturnValue(Promise.resolve({ id: 1, saved: true })),
        getUser: jest
          .fn()
          .mockReturnValue(Promise.resolve({ id: 1, name: 'John' })),
        deleteUser: jest.fn().mockReturnValue(Promise.resolve(true)),
      };

      // 2. Test the mock service methods
      expect(mockUserService.saveUser).toBeDefined();
      expect(typeof mockUserService.saveUser).toBe('function');

      // 3. Test service method calls
      mockUserService.saveUser({
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(mockUserService.saveUser).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(mockUserService.saveUser).toHaveBeenCalledTimes(1);
    });

    // Example of testing async service calls
    it('should test async service operations', async () => {
      // Mock an async service method
      const mockAsyncService = {
        fetchData: jest.fn().mockResolvedValue({ data: 'test data' }),
        postData: jest.fn().mockRejectedValue(new Error('Network error')),
      };

      // Test successful async call
      const result = await mockAsyncService.fetchData();
      expect(result).toEqual({ data: 'test data' });
      expect(mockAsyncService.fetchData).toHaveBeenCalled();

      // Test error handling
      try {
        await mockAsyncService.postData();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }
    });
  });
});
