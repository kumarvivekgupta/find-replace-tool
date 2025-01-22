import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'find-replace-tool';
  originalText: string = ''; // Text that the user inputs
  findText: string = ''; // The text the user wants to find
  replaceText: string = ''; // The text to replace the found text
  resultText: string = ''; // The resulting text after replacement

  highlightedOriginalText: string = ''; // The original text with highlighted found text
  highlightedResultText: string = ''; // The result text with replaced and highlighted text

  isExpanded: boolean = false;


  constructor(private renderer: Renderer2, private el: ElementRef, private readonly viewContainerRef: ViewContainerRef) { }


  replaceTextFunction() {
    if (this.findText) {
      // Create a RegEx for finding the text to be replaced
      const regex = new RegExp(this.findText, 'gi'); // Case-insensitive, global

      // Highlight the original text by wrapping the found text with a span
      this.highlightedOriginalText = this.highlightText(this.originalText, regex);

      // Replace and highlight the result text
      this.highlightedResultText = this.replaceAndHighlight(this.originalText, regex);
      this.isExpanded = this.isExpanded === false ? true : true;
    } else {
      this.highlightedOriginalText = this.originalText;
      this.highlightedResultText = this.originalText;
    }

  }

  // Function to highlight matched text
  highlightText(text: string, regex: RegExp): string {
    return text.replace(regex, (match) => {
      return `<span class="highlight">${match}</span>`;
    });
  }

  // Function to replace matched text and highlight it
  replaceAndHighlight(text: string, regex: RegExp): string {
    return text.replace(regex, (match) => {
      return `<span class="highlight">${this.replaceText}</span>`;
    });
  }
}
