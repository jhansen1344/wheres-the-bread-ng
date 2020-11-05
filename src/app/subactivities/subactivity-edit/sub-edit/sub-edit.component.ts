import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubActivityDetail } from 'src/app/_models/subActivityDetail';
import { SubService } from 'src/app/_services/sub.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemsService } from 'src/app/_services/items.service';
import { Item } from 'src/app/_models/item';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ItemChecked } from 'src/app/_models/checked-item';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sub-edit',
  templateUrl: './sub-edit.component.html',
  styleUrls: ['./sub-edit.component.css']
})
export class SubEditComponent implements OnInit {

  @ViewChild('editForm')editForm: NgForm;
  sub: SubActivityDetail;
  items: any[];
  availableItems: any[] = [];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue =  true;
    }
  }
  constructor(private subService: SubService, private itemService: ItemsService, 
              private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadSub();
  }

  loadSub(){
    this.subService.getSub(this.route.snapshot.paramMap.get('id')).subscribe(sub => {
      this.sub = sub;
      this.itemService
        .getItems()
        .pipe(
          map((responseData) => {
            const allItems = [];
            responseData.forEach((item) => {
              let isMatch = false;
              let checkItem: ItemChecked = {};
              for (const subItem of this.sub.items) {
                if (item.name === subItem.name) {
                  isMatch = true;
                  checkItem.name = item.name;
                  checkItem.location = item.location;
                  checkItem.checked = true;
                  allItems.push(checkItem);
                  break;
                }
              }
              if (!isMatch) {
                checkItem.name = item.name;
                checkItem.location = item.location;
                checkItem.checked = false;
                allItems.push(checkItem);
              }
            });
            return allItems;
          })
        )
        .subscribe((items) => {
          this.availableItems = items;
        });
    });

  }

  updateItem(){
   this.subService.updateSub(this.sub).subscribe(() => {
    this.toastr.success('Activity Updated Successfully');
    this.editForm.reset(this.sub);
   })
  }

  

}
