import { Component } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { ChildComponent } from '../child/child.component';

@Component({
    selector: 'app-parent-child-demo',
    imports: [ParentComponent, ChildComponent],
    templateUrl: './parent-child-demo.component.html',
    styleUrl: './parent-child-demo.component.scss'
})
export class ParentChildDemoComponent {

}
