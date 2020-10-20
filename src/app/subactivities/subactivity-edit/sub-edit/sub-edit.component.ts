import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubActivityDetail } from 'src/app/_models/subActivityDetail';
import { SubService } from 'src/app/_services/sub.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sub-edit',
  templateUrl: './sub-edit.component.html',
  styleUrls: ['./sub-edit.component.css']
})
export class SubEditComponent implements OnInit {

  @ViewChild('editForm')editForm: NgForm;
  sub: SubActivityDetail;
  items: any[];
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue =  true;
    }
  }
  constructor(private subService: SubService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadSub();
  }

  loadSub(){
    this.subService.getSub(this.route.snapshot.paramMap.get('id')).subscribe(sub => {
      this.sub = sub;
    });
  }

  updateItem(){
   this.subService.updateSub(this.sub).subscribe(() => {
    this.toastr.success('Activity Updated Successfully');
    this.editForm.reset(this.sub);
   })
  }

}
