import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameSearch'
})
export class NameSearchPipe implements PipeTransform {


  transform(data : any[], userWord:string): any[] {
    return data.filter((oneProd)=> oneProd.name.toLocaleLowerCase().includes(userWord.toLocaleLowerCase()))
  }
}
