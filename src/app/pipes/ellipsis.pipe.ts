import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone: true
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, characters: number): string {
    return value.length > characters ? 
    value.substring(0, Math.abs(characters))+'...' :
    value;
  }

}
