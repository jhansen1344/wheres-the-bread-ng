import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../_models/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  baseUrl = environment.apiUrl;
  items: Item[] = [];
  constructor(private http: HttpClient) {
   }

   getItems(){
     if (this.items.length > 0){
       console.log('didnt call api');
        return of(this.items);
     }
     return this.http.get<Item[]>(this.baseUrl + 'item').pipe(
       map(items => {
         this.items = items;
         console.log('Called api');
         return items;
       })
     );
   }

   getItem(itemId: string){
     const item = this.items.find(x => x.id.toString() === itemId )
     if (item !== undefined){
       return of(item);
     }
     return this.http.get<Item>(this.baseUrl + 'item/' + itemId);
   }

   updateItem(item: Item){
    return this.http.put(this.baseUrl + 'item/' + item.id, item).pipe(
      map(() =>{
        const index = this.items.indexOf(item);
        this.items[index] = item;
      })
    )
   }
}
