import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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
  form: FormGroup;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue =  true;
    }
  }
  constructor(private subService: SubService, private itemService: ItemsService, 
              private route: ActivatedRoute, private toastr: ToastrService, private formBuilder: FormBuilder) {
                
               }

  ngOnInit(): void {
    this.loadSub();
    this.form = this.formBuilder.group({
      itemsToUpdate: new FormArray([])
    });
    
  }

  get itemsFormArray(){
    return this.form.controls.itemsToUpdate as FormArray;
  }

  private addCheckboxes(){
    this.availableItems.forEach(item => this.itemsFormArray.push(new FormControl(item.checked)));
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
                  checkItem.id = item.id;
                  checkItem.name = item.name;
                  checkItem.location = item.location;
                  checkItem.checked = true;
                  allItems.push(checkItem);
                  break;
                }
              }
              if (!isMatch) {
                checkItem.id = item.id;
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
          this.addCheckboxes();
        });
    });

  }

  updateItem(){
    const selectedItemIds = this.form.value.itemsToUpdate
    .map((checked, i) => checked ? this.availableItems[i].id : null)
    .filter(v=> v !==null);

    const subToUpdate = {id: this.sub.id,
    name: this.sub.name,
    itemIds: selectedItemIds
  };
   this.subService.updateSub(subToUpdate).subscribe(() => {
    this.toastr.success('Activity Updated Successfully');
    this.editForm.reset(this.sub);
   })
  }

  

}
