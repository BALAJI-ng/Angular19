import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserFacadeService } from './user.facade';
import { User } from './user.model';

@Component({
  selector: 'app-json-server-ngrx-adaptor-facade',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './json-server-ngrx-adaptor-facade.component.html',
  styleUrl: './json-server-ngrx-adaptor-facade.component.scss'
})
export class JsonServerNgrxAdaptorFacadeComponent implements OnInit {

  userForm!: FormGroup;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  usersCount$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacadeService
  ) {
    // Initialize observables from facade
    this.users$ = this.userFacade.users$;
    this.loading$ = this.userFacade.loading$;
    this.error$ = this.userFacade.error$;
    this.usersCount$ = this.userFacade.usersCount$;
  }

  ngOnInit(): void {
    // Initialize form
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Load users from JSON Server on component init
    this.userFacade.loadUsers();
  }

  finalSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      // Add user via facade service
      this.userFacade.addUser(userData.name);
      
      // Reset form
      this.userForm.reset();
    }
  }
}
