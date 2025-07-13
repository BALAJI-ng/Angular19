import { AppHighlightDirective } from './app-highlight.directive';
import { ElementRef } from '@angular/core';

describe('AppHighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {
      nativeElement: {
        style: {
          backgroundColor: '',
          transition: '',
          padding: '',
          borderRadius: '',
        },
      },
    } as ElementRef;

    const directive = new AppHighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
