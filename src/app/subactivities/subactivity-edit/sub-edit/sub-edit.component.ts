import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubActivityDetail } from 'src/app/_models/subActivityDetail';
import { SubService } from 'src/app/_services/sub.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemsService } from 'src/app/_services/items.service';
import { Item } from 'src/app/_models/item';

@Component({
  selector: 'app-sub-edit',
  templateUrl: './sub-edit.component.html',
  styleUrls: ['./sub-edit.component.css']
})
export class SubEditComponent implements OnInit {

  @ViewChild('editForm')editForm: NgForm;
  sub: SubActivityDetail;
  items: any[] = [];
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
    });

    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.items.forEach(item => {
        let isMatch = false;
        for(const subItem of this.sub.items){
          if (item.name === subItem.name){
            isMatch = true;
            item.checked = true;
            this.availableItems.push(item);
            break;
          }
        }
        if(!isMatch){
          item.checked = false;
          this.availableItems.push(item); 
        }
      })
    });
    
  }

  updateItem(){
   this.subService.updateSub(this.sub).subscribe(() => {
    this.toastr.success('Activity Updated Successfully');
    this.editForm.reset(this.sub);
   })
  }

  // private getSubItemsArray(){
  //   const allItems = [];
  //   this.items.forEach(item => {
  //     let isMatch = false;
  //     for(const subItem of this.sub.items){
  //       if (item.name === subItem.name){
  //         isMatch = true;
  //         item.checked = true;
  //         allItems.push(item);
  //         break;
  //       }
  //     }
  //     if(!isMatch){
  //       item.checked = false;
  //       availableItems.push(item); 
  //     }
  //   })

  //   return allItems;


  // }

}
