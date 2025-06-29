import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExampleService {
    private examples = [
        {
            title: 'Basic Directive Usage',
            description: 'Simple highlight directive with default behavior',
            code: `<p appHighlight>This text will highlight on hover</p>`
        },
        {
            title: 'Custom Color Directive',
            description: 'Directive with custom highlight color',
            code: `<p appHighlight="lightcoral">Custom color highlight</p>`
        },
        {
            title: 'Conditional Highlighting',
            description: 'Highlight based on component state',
            code: `<div [appHighlight]="isActive ? 'lightgreen' : 'lightgray'">
  Conditional highlighting
</div>`
        },
        {
            title: 'Form Integration',
            description: 'Using directive with form elements',
            code: `<input appHighlight="lightblue" type="text" class="form-control">
<button appHighlight="lightcoral" class="btn btn-primary">Submit</button>`
        }
    ];

    getExamples() {
        return this.examples;
    }

    getRandomColor(): string {
        const colors = [
            'lightblue', 'lightgreen', 'lightcoral', 'lightyellow',
            'lightpink', 'lightcyan', 'lightsalmon', 'lavender'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    logExample(title: string): void {
        console.log(`🎯 Example: ${title} - Demonstrated successfully!`);
    }
}
