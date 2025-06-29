import { Component, signal, ChangeDetectionStrategy, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals',
  imports: [CommonModule],
  templateUrl: './signals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  mySignal = signal(0);

  // Additional signals for effect demonstrations
  lastAction = signal<string>('Initial');
  changeHistory = signal<string[]>([]);
  effectLog = signal<string[]>([]);

  // Computed signals - automatically recalculate when dependencies change
  doubleValue = computed(() => this.mySignal() * 2);
  isEven = computed(() => this.mySignal() % 2 === 0);
  squaredValue = computed(() => this.mySignal() ** 2);
  signalStatus = computed(() => {
    const value = this.mySignal();
    if (value === 0) return 'Zero';
    if (value < 0) return 'Negative';
    if (value > 10) return 'High';
    return 'Positive';
  });

  // Effects - run side effects when signals change
  constructor() {
    // Effect 1: Log changes to console
    effect(() => {
      const value = this.mySignal();
      console.log(`🎯 Signal value changed to: ${value}`);

      // Update effect log
      const timestamp = new Date().toLocaleTimeString();
      this.effectLog.update(logs => [...logs, `${timestamp}: Value changed to ${value}`].slice(-5));
    });

    // Effect 2: Track change history
    effect(() => {
      const value = this.mySignal();
      const action = this.lastAction();

      this.changeHistory.update(history =>
        [...history, `${action}: ${value}`].slice(-10) // Keep last 10 changes
      );
    });

    // Effect 3: Local storage persistence
    effect(() => {
      const value = this.mySignal();
      localStorage.setItem('signalValue', value.toString());
      console.log(`💾 Saved to localStorage: ${value}`);
    });

    // Effect 4: Alert for special values
    effect(() => {
      const value = this.mySignal();
      if (value === 42) {
        alert('🎉 You found the answer to everything!');
      } else if (value === 100) {
        alert('💯 Perfect score!');
      } else if (value < -10) {
        alert('⚠️ Getting very negative!');
      }
    });
  }
  incrementSignal() {
    this.lastAction.set('Increment');
    this.mySignal.update(value => value + 1);
  }

  resetSignal() {
    this.lastAction.set('Reset');
    this.mySignal.set(0);
  }

  decrementSignal() {
    this.lastAction.set('Decrement');
    this.mySignal.update(value => value - 1);
  }

  setSpecialValue(value: number) {
    this.lastAction.set(`Set to ${value}`);
    this.mySignal.set(value);
  }

  clearLogs() {
    this.effectLog.set([]);
    this.changeHistory.set([]);
  }
}

