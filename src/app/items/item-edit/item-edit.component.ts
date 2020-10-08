import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private itemService: ItemsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(){
    this.itemService.getItem(this.route.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
    });
  }

  updateItem(){
    console.log(this.item);
    this.toastr.success('Item Updated Successfully');
    this.editForm.reset(this.item);
  }

}
