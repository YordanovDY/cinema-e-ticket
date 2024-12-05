import { Pipe, PipeTransform } from '@angular/core';
import { ShortMovie } from '../types/movie';

type FirstLetterArray = [string, ShortMovie[]][];

@Pipe({
  name: 'alphabeticalArray',
  standalone: true
})
export class AlphabeticalArrayPipe implements PipeTransform {

  transform(array: ShortMovie[]): FirstLetterArray {

    let sortedArray = array.sort((a,b) => a.title.localeCompare(b.title));

    let lettersArray: string[] = [];

    sortedArray.forEach(str => {
      const letter = str.title[0].toUpperCase();
      if(!lettersArray.includes(letter)){
        lettersArray.push(letter);
      }
    })

    let complexArray: FirstLetterArray = [];

    for (const letter of lettersArray) {
      let arr = sortedArray.filter(str => str.title.startsWith(letter));
      complexArray.push([letter, arr]);
    }

    return complexArray;
  }

}
