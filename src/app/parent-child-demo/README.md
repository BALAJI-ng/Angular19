# ViewChild vs ContentChild - Minimal Example

This is a complete, minimal example that demonstrates the key differences between `@ViewChild` and `@ContentChild` in Angular.

## 🎯 What This Example Shows

### ViewChild

- References components declared **directly in the parent's template**
- The `<app-child>` in `parent.component.html` is accessible via `@ViewChild`
- Available after `ngAfterViewInit()`

### ContentChild

- References components **projected through `<ng-content>`**
- The `<app-child>` inside `<app-parent>` tags is accessible via `@ContentChild`
- Available after `ngAfterContentInit()`

## 📁 File Structure

```
src/app/
├── parent/
│   ├── parent.component.ts       # Contains @ViewChild and @ContentChild
│   ├── parent.component.html     # Template with <app-child> and <ng-content>
│   └── parent.component.scss     # Styling
├── child/
│   ├── child.component.ts        # Simple child component
│   ├── child.component.html      # Child template
│   └── child.component.scss      # Child styling
└── parent-child-demo/
    ├── parent-child-demo.component.ts    # Demo wrapper
    ├── parent-child-demo.component.html  # Shows usage
    └── parent-child-demo.component.scss  # Demo styling
```

## 🚀 Usage Example

```html
<!-- This is how you use it -->
<app-parent>
  <app-child></app-child>
  <!-- This becomes ContentChild -->
</app-parent>
```

## 🔍 Key Code Snippets

### Parent Component (parent.component.ts)

```typescript
export class ParentComponent {
  // ViewChild: References child in template
  @ViewChild(ChildComponent) viewChildComponent!: ChildComponent;

  // ContentChild: References projected child
  @ContentChild(ChildComponent) contentChildComponent!: ChildComponent;

  ngAfterViewInit() {
    // ViewChild is available here
    if (this.viewChildComponent) {
      console.log("✅ ViewChild found");
    }
  }

  ngAfterContentInit() {
    // ContentChild is available here
    if (this.contentChildComponent) {
      console.log("✅ ContentChild found");
    }
  }
}
```

### Parent Template (parent.component.html)

```html
<!-- ViewChild: Child declared in template -->
<app-child></app-child>

<!-- ContentChild: Projected content goes here -->
<ng-content></ng-content>
```

## 🎮 Interactive Features

- **Increment Buttons**: Test both ViewChild and ContentChild interactions
- **Status Messages**: See real-time updates from both components
- **Console Logs**: Open browser console to see lifecycle events

## 🏃‍♂️ How to Run

1. Navigate to: `/dashboard/parent-child-demo`
2. Open browser console to see lifecycle logs
3. Click the increment buttons to test interactions
4. Observe the difference between ViewChild and ContentChild behavior

## 💡 Key Takeaways

1. **ViewChild** = Child component in your template
2. **ContentChild** = Child component projected from outside
3. **Lifecycle**: ViewChild available in `ngAfterViewInit`, ContentChild in `ngAfterContentInit`
4. **Use Cases**:
   - ViewChild: Direct child manipulation
   - ContentChild: Building reusable wrapper components

This example provides the simplest possible demonstration while still being interactive and educational!
