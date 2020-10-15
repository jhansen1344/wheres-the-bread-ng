import { Component, OnInit } from '@angular/core';
import { SubActivityDetail } from 'src/app/_models/subActivityDetail';
import { ActivatedRoute } from '@angular/router';
import { SubService } from 'src/app/_services/sub.service';

@Component({
  selector: 'app-sub-detail',
  templateUrl: './sub-detail.component.html',
  styleUrls: ['./sub-detail.component.css']
})
export class SubDetailComponent implements OnInit {

  sub: SubActivityDetail;
  constructor(private subService: SubService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSub();
  }

  loadSub(){
    this.subService.getSub(this.route.snapshot.paramMap.get('id')).subscribe(sub => {
      this.sub = sub;
    });
  }

}
