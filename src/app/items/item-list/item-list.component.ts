import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;
  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.itemService.getItems();
  }

  deleteItem(id: number){
    this.itemService.deleteItem(id).subscribe(() =>{
      this.items$ = this.itemService.getItems();
    })
  }

}
