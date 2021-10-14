import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @ViewChild('editForm')editForm: NgForm;
  item: Item;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue =  true;
    }
  }
  constructor(private itemService: ItemsService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(){
    this.itemService.getItem(this.route.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
    });
  }

  updateItem(){
   this.itemService.updateItem(this.item).subscribe(() => {
    this.toastr.success('Item Updated Successfully');
    this.editForm.reset(this.item);
    this.router.navigateByUrl('/items');
   })
  }

}
