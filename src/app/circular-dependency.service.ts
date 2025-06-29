import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CircularDependencyService {

  constructor() { }

  // This service will demonstrate circular dependency scenarios
  // and their solutions in real-world applications
}
