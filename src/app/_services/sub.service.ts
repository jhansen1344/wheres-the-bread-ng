import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubActivityList } from '../_models/subActivityList';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubActivityDetail } from '../_models/subActivityDetail';
import { SubActivityCreate } from '../_models/subActivityCreate';


@Injectable({
  providedIn: 'root'
})
export class SubService {
  baseUrl = environment.apiUrl;
  subs: SubActivityList[] = [];
  sub: SubActivityDetail;
  constructor(private http: HttpClient) {
   }

   createSub(subActivity: SubActivityCreate){
    return this.http.post(this.baseUrl + 'subactivity', subActivity);
  }

   getSubs(){
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

   getSub(subId: string){
     return this.http.get<SubActivityDetail>(this.baseUrl + 'subactivity/' + subId);
   }

   updateSub(sub){
    return this.http.put(this.baseUrl + 'subactivity/' + sub.id, sub).pipe(
      map(() => {
        const index = this.subs.indexOf(sub);
        this.subs[index] = sub;
      })
    )
   }

   deleteSub(id: number){
    return this.http.post(this.baseUrl + 'subactivity/' + id, {}).pipe(
      map(() => {
       this.subs.splice(this.subs.findIndex(s => s.id === id), 1);
      })
    );
  }
}
