import { Component } from '@angular/core';
import { ParentComponent } from "../parent/parent.component";

@Component({
  selector: 'app-component-architecture',
  imports: [ParentComponent],
  templateUrl: './component-architecture.component.html',
  styleUrl: './component-architecture.component.scss'
})
export class ComponentArchitectureComponent {

}
