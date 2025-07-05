import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert.service';

@Component({
    selector: 'app-error-test',
    imports: [CommonModule],
    template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-danger text-white">
          <h5><i class="bi bi-bug me-2"></i>Error Interceptor Test</h5>
        </div>
        <div class="card-body">
          <p class="text-muted">
            Click the buttons below to test different HTTP error scenarios. 
            The interceptor will automatically catch the errors and display alerts.
          </p>
          
          <div class="row">
            <div class="col-md-6">
              <h6>HTTP Status Code Tests</h6>
              <div class="d-grid gap-2">
                <button class="btn btn-outline-danger" (click)="test401Error()">
                  <i class="bi bi-shield-exclamation me-2"></i>
                  Test 401 - Unauthorized
                </button>
                <button class="btn btn-outline-danger" (click)="test403Error()">
                  <i class="bi bi-shield-x me-2"></i>
                  Test 403 - Forbidden
                </button>
                <button class="btn btn-outline-warning" (click)="test404Error()">
                  <i class="bi bi-question-circle me-2"></i>
                  Test 404 - Not Found
                </button>
                <button class="btn btn-outline-danger" (click)="test500Error()">
                  <i class="bi bi-server me-2"></i>
                  Test 500 - Server Error
                </button>
              </div>
            </div>
            
            <div class="col-md-6">
              <h6>Network & Other Tests</h6>
              <div class="d-grid gap-2">
                <button class="btn btn-outline-warning" (click)="testNetworkError()">
                  <i class="bi bi-wifi-off me-2"></i>
                  Test Network Error
                </button>
                <button class="btn btn-outline-info" (click)="testCustomError()">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  Test Custom Error
                </button>
                <button class="btn btn-success" (click)="testSuccessRequest()">
                  <i class="bi bi-check-circle me-2"></i>
                  Test Success Request
                </button>
                <button class="btn btn-secondary" (click)="clearAlerts()">
                  <i class="bi bi-x-circle me-2"></i>
                  Clear Alerts
                </button>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <h6>Instructions:</h6>
            <ul class="list-unstyled">
              <li><i class="bi bi-1-circle me-2"></i>Click any error button to trigger an HTTP request</li>
              <li><i class="bi bi-2-circle me-2"></i>The interceptor will catch the error</li>
              <li><i class="bi bi-3-circle me-2"></i>An alert will be displayed with the error details</li>
              <li><i class="bi bi-4-circle me-2"></i>Check the browser console for detailed error logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .btn {
      margin-bottom: 10px;
    }
    
    .list-unstyled li {
      margin-bottom: 5px;
    }
  `]
})
export class ErrorTestComponent {

    constructor(
        private http: HttpClient,
        private alertService: AlertService
    ) { }

    test401Error() {
        console.log('Testing 401 error...');
        this.http.get('https://httpstat.us/401').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('401 Error caught by interceptor:', error)
        });
    }

    test403Error() {
        console.log('Testing 403 error...');
        this.http.get('https://httpstat.us/403').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('403 Error caught by interceptor:', error)
        });
    }

    test404Error() {
        console.log('Testing 404 error...');
        this.http.get('https://httpstat.us/404').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('404 Error caught by interceptor:', error)
        });
    }

    test500Error() {
        console.log('Testing 500 error...');
        this.http.get('https://httpstat.us/500').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('500 Error caught by interceptor:', error)
        });
    }

    testNetworkError() {
        console.log('Testing network error...');
        this.http.get('https://this-domain-does-not-exist-12345.com/api/test').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('Network Error caught by interceptor:', error)
        });
    }

    testCustomError() {
        console.log('Testing custom error...');
        this.http.get('https://httpstat.us/418').subscribe({
            next: (response) => console.log('Unexpected success:', response),
            error: (error) => console.log('Custom Error caught by interceptor:', error)
        });
    }

    testSuccessRequest() {
        console.log('Testing success request...');
        this.http.get('https://httpstat.us/200').subscribe({
            next: (response) => {
                console.log('Success response:', response);
                this.alertService.showAlert('Success', 'Request completed successfully!');
            },
            error: (error) => console.log('Unexpected error:', error)
        });
    }

    clearAlerts() {
        // Since your alert service doesn't have a clear method, 
        // we'll show a message instead
        this.alertService.showAlert('Info', 'Alerts cleared (refresh page to fully clear)');
    }
}
