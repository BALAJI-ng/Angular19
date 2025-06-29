import { Component, ContentChild, AfterContentInit, ElementRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-child',
  imports: [CommonModule],
  templateUrl: './content-child.component.html',
  styleUrl: './content-child.component.scss'
})
export class ContentChildComponent implements AfterContentInit {

  // ContentChild to access projected content by selector
  @ContentChild('projectedButton') projectedButton!: ElementRef;
  @ContentChild('projectedTemplate') projectedTemplate!: TemplateRef<any>;
  @ContentChild('specialContent') specialContent!: ElementRef;

  projectedButtonText: string = 'No button projected yet...';
  hasProjectedTemplate: boolean = false;
  specialContentText: string = 'No special content found...';

  ngAfterContentInit(): void {
    // Access projected button
    if (this.projectedButton) {
      this.projectedButtonText = this.projectedButton.nativeElement.textContent || 'Button found but no text';
      console.log('Projected button found:', this.projectedButton.nativeElement);
    }

    // Check for projected template
    if (this.projectedTemplate) {
      this.hasProjectedTemplate = true;
      console.log('Projected template found:', this.projectedTemplate);
    }

    // Access special content
    if (this.specialContent) {
      this.specialContentText = this.specialContent.nativeElement.textContent || 'Special content found but no text';
      console.log('Special content found:', this.specialContent.nativeElement);
    }
  }

  onProjectedButtonClick(): void {
    if (this.projectedButton) {
      this.projectedButton.nativeElement.style.backgroundColor =
        this.projectedButton.nativeElement.style.backgroundColor === 'green' ? 'blue' : 'green';
      console.log('Projected button style changed via ContentChild!');
    }
  }

  getProjectedButtonInfo(): string {
    if (this.projectedButton) {
      const btn = this.projectedButton.nativeElement;
      return `Button info: Tag: ${btn.tagName}, Classes: ${btn.className}, Text: ${btn.textContent}`;
    }
    return 'No projected button available';
  }
}
