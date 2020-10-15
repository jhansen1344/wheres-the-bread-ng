import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubActivityList } from '../_models/subActivityList';
import { SubService } from '../_services/sub.service';


@Component({
  selector: 'app-subactivities',
  templateUrl: './subactivities.component.html',
  styleUrls: ['./subactivities.component.css']
})
export class SubactivitiesComponent implements OnInit {

  subActivities$: Observable<SubActivityList[]>;
  constructor(private subService: SubService) { }

  ngOnInit(): void {
    this.subActivities$ = this.subService.getSubs();
  }

}
