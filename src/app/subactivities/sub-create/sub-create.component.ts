import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  createForm: FormGroup;
  validationErrors: string[] = [];
  items$: Observable<Item[]>;

  constructor(private subService: SubService, private itemService: ItemsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.items$ = this.itemService.getItems();
  }

  initializeForm(){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      itemIds:[]
    });

  }

  create(){

    this.subService.createSub(this.createForm.value).subscribe(response => {

      this.router.navigateByUrl('/subactivities');
    }, error =>{
      this.validationErrors = error;
    });
  }

  cancel(){
      this.cancelCreate.emit(false);
  }

}