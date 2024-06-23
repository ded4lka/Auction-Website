import { Pipe, PipeTransform } from "@angular/core";
import { IProduct } from "../models/product";

@Pipe({
    name: 'filterProducts'
})

export class FilterProductsPipe implements PipeTransform{
    transform(products: IProduct[]): IProduct[] {
        return products.filter(p => p.isBought == false);
    }
}