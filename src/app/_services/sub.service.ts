import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubActivityList } from '../_models/subActivityList';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubActivityDetail } from '../_models/subActivityDetail';

@Injectable({
  providedIn: 'root'
})
export class SubService {
  baseUrl = environment.apiUrl;
  subs: SubActivityList[] = [];
  constructor(private http: HttpClient) {
   }

   getItems(){
     if (this.subs.length > 0){
        return of(this.subs);
     }
     return this.http.get<SubActivityList[]>(this.baseUrl + 'subactivity').pipe(
       map(subs => {
         this.subs = subs;
         return subs;
       })
     );
   }

   getItem(subId: string){
     const sub = this.subs.find(x => x.id.toString() === subId )
     if (sub !== undefined){
       return of(sub);
     }
     return this.http.get<SubActivityDetail>(this.baseUrl + 'subactivity/' + subId);
   }

   updateItem(sub: SubActivityDetail){
    return this.http.put(this.baseUrl + 'subactivity/' + sub.id, sub).pipe(
      map(() => {
        const index = sub.id;
        // this.subs[index] = sub;
      })
    )
   }
}
