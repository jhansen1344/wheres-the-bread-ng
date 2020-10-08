import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  constructor(private itemService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(){
    this.itemService.getItem(this.route.snapshot.paramMap.get('id')).subscribe(item => {
      this.item = item;
    });
  }

}
