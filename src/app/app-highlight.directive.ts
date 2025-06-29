import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class AppHighlightDirective {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {
    // Set initial highlight
    this.highlight('lightblue');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('lightblue');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    this.el.nativeElement.style.padding = '8px';
    this.el.nativeElement.style.borderRadius = '4px';
  }
} 
