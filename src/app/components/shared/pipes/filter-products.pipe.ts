import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product';

@Pipe({
    name: 'filterCartProducts'
})
export class FilterCartProductsPipe implements PipeTransform {
    transform(products: IProduct[], ids: number[]): IProduct[]{
        return products.filter(p => {
            let res = false;
            ids.forEach(id => {
                if(p.id == id) {
                    res = true;
                }
            })
            return res;
        })
    }
}