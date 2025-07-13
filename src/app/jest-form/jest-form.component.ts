import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jest-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jest-form.component.html',
  styleUrl: './jest-form.component.scss',
})
export class JestFormComponent {
  userForm!: FormGroup;
  // Form initialization and other methods will go here
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get age() {
    return this.userForm.get('age');
  }
}
