import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
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
  originalText: string = '';
  findText: string = '';
  replaceText: string = '';
  resultText: string = '';

  highlightedOriginalText: string = ''; // The original text with highlighted found text
  highlightedResultText: string = ''; // The result text with replaced and highlighted text

  isExpanded: boolean = false;


  constructor() { }


  replaceTextFunction() {
    if (this.findText) {
      // Create a RegEx for finding the text to be replaced
      const regex = new RegExp(this.findText, 'gi');

      this.highlightedOriginalText = this.highlightText(this.originalText, regex);
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
