import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { SubService } from 'src/app/_services/sub.service';

@Component({
  selector: 'app-sub-create',
  templateUrl: './sub-create.component.html',
  styleUrls: ['./sub-create.component.css']
})


export class SubCreateComponent implements OnInit {
  
  @Output() cancelCreate = new EventEmitter();
  form: FormGroup;
  validationErrors: string[] = [];
  itemsData: Item[] = [];

  get itemsFormArray() {
    return this.form.controls.items as FormArray;
  }

  constructor(private subService: SubService, 
    private itemService: ItemsService, 
    private toastr: ToastrService, 
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.itemService.getItems().subscribe(items => {
      this.itemsData = items;
      this.addCheckboxes();
    });
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      items: new FormArray([])
    });

  }

  private addCheckboxes(){
    this.itemsData.forEach(() => this.itemsFormArray.push(new FormControl(false)));
  }

  create(){
    const selectedItemIds = this.form.value.items
      .map((checked, i) => checked ? this.itemsData[i].id : null)
      .filter(v => v !== null);

      let subCreate = {name: this.form.value.name, itemIds: selectedItemIds};

    this.subService.createSub(subCreate).subscribe(response => {

      this.router.navigateByUrl('/subactivities');
    }, error =>{
      this.validationErrors = error;
    });
  }

  cancel(){
      this.cancelCreate.emit(false);
  }

}