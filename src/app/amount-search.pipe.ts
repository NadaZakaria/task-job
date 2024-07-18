import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountSearch'
})
export class AmountSearchPipe implements PipeTransform {

  transform(data : any[], userWord:string): any[] {
    return data.filter((oneProd)=> oneProd.totalAmount.toString().includes(userWord))
  }

}
