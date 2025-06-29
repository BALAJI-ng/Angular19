import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsComponent } from '../../signals/signals.component';
import { AppHighlightDirective } from '../../app-highlight.directive';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SignalsComponent, AppHighlightDirective],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 appHighlight="lightgreen" class="mb-0">Welcome to AdviKart Dashboard</h4>
            </div>
            <div class="card-body">
              <p class="card-text">This is your main dashboard. Use the sidebar navigation to explore different features.</p>
              
              <!-- Directive Examples -->
              <div class="row mt-3">
                <div class="col-12">
                  <h5 appHighlight="lightcoral">Custom Directive Examples</h5>
                  <p appHighlight="lightyellow">Hover over this text to see the highlight effect!</p>
                  <button appHighlight="lightpink" class="btn btn-outline-primary me-2">Highlighted Button</button>
                  <span appHighlight class="badge bg-secondary">Default Highlight Badge</span>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-md-4">
                  <div class="card text-white bg-primary">
                    <div class="card-header">Quick Stats</div>
                    <div class="card-body">
                      <h5 class="card-title">150</h5>
                      <p class="card-text">Total Users</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card text-white bg-success">
                    <div class="card-header">Revenue</div>
                    <div class="card-body">
                      <h5 class="card-title">$12,500</h5>
                      <p class="card-text">This Month</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card text-white bg-info">
                    <div class="card-header">Orders</div>
                    <div class="card-body">
                      <h5 class="card-title">85</h5>
                      <p class="card-text">This Week</p>                </div>
              </div>
              
              <!-- Angular Signals Demo Section -->
              <div class="row mt-4">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="mb-0">🎯 Angular Signals Demo</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text">Demonstrating Angular Signals - a new reactive primitive for Angular applications.</p>
                      <div class="signals-demo">
                        <app-signals></app-signals>
                      </div>
                      <div class="mt-3">
                        <small class="text-muted">
                          <strong>What are Signals?</strong> Signals are a reactive primitive that can hold a value and notify interested consumers when that value changes.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border: none;
    }
    
    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
  `]
})
export class HomeComponent {

}
