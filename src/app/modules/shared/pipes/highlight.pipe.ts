import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(content: string, query: string): string {
    if (!query) {
      return content;
    }
    return content.replace(new RegExp(query, 'gi'), match => {
      return '<span class="highlight">' + match + '</span>';
    });
  }
}
