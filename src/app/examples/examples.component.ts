import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppHighlightDirective } from '../app-highlight.directive';
import { ExampleService } from './example.service';

@Component({
    selector: 'app-examples',
    standalone: true,
    imports: [CommonModule, FormsModule, AppHighlightDirective],
    templateUrl: './examples.component.html',
    styleUrl: './examples.component.scss'
})
export class ExamplesComponent implements OnInit {
    // Example data for demonstrations
    selectedColor = 'lightblue';
    customMessage = 'Hover over me!';
    isEnabled = true;

    // Service examples
    serviceExamples: any[] = [];

    // ...existing code...

    constructor(public exampleService: ExampleService) { }

    ngOnInit(): void {
        this.serviceExamples = this.exampleService.getExamples();
    }

    // Color options for examples
    colorOptions = [
        { name: 'Light Blue', value: 'lightblue' },
        { name: 'Light Green', value: 'lightgreen' },
        { name: 'Light Coral', value: 'lightcoral' },
        { name: 'Light Yellow', value: 'lightyellow' },
        { name: 'Light Pink', value: 'lightpink' },
        { name: 'Light Cyan', value: 'lightcyan' },
        { name: 'Light Salmon', value: 'lightsalmon' },
        { name: 'Light Lavender', value: 'lavender' }
    ];

    // Example list items
    listItems = [
        { id: 1, title: 'Feature A', description: 'Advanced routing system', color: 'lightgreen' },
        { id: 2, title: 'Feature B', description: 'NgRx state management', color: 'lightblue' },
        { id: 3, title: 'Feature C', description: 'Component interaction', color: 'lightyellow' },
        { id: 4, title: 'Feature D', description: 'Dependency injection', color: 'lightcoral' },
        { id: 5, title: 'Feature E', description: 'Custom directives', color: 'lightpink' }
    ];

    // Card examples
    cardExamples = [
        {
            title: 'Dashboard Analytics',
            content: 'Real-time data visualization and reporting',
            highlight: 'lightsteelblue',
            icon: '📊'
        },
        {
            title: 'User Management',
            content: 'Complete user lifecycle management system',
            highlight: 'lightgreen',
            icon: '👥'
        },
        {
            title: 'E-commerce Platform',
            content: 'Full-featured online shopping experience',
            highlight: 'lightsalmon',
            icon: '🛒'
        },
        {
            title: 'Content Management',
            content: 'Dynamic content creation and publishing',
            highlight: 'lightcyan',
            icon: '📝'
        }
    ];

    // Methods for interactive examples
    addNewItem(): void {
        const newItem = {
            id: this.listItems.length + 1,
            title: `Feature ${String.fromCharCode(65 + this.listItems.length)}`,
            description: 'Dynamically added feature',
            color: this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)].value
        };
        this.listItems.push(newItem);
    }

    removeItem(id: number): void {
        this.listItems = this.listItems.filter(item => item.id !== id);
    }

    changeAllColors(): void {
        this.listItems = this.listItems.map(item => ({
            ...item,
            color: this.colorOptions[Math.floor(Math.random() * this.colorOptions.length)].value
        }));
    }

    getRandomColor(): string {
        return this.exampleService.getRandomColor();
    }

    toggleHighlight(): void {
        this.isEnabled = !this.isEnabled;
    }

    demonstrateExample(title: string): void {
        this.exampleService.logExample(title);
    }
}
