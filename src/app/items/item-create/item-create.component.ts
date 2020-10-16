import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/_services/items.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  @Output() cancelCreate = new EventEmitter();
  createForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private itemService: ItemsService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    })
  }


  create(){

    this.itemService.createItem(this.createForm.value).subscribe(response => {

      this.router.navigateByUrl('/items');
    }, error =>{
      this.validationErrors = error;
    });
  }

  cancel(){
      this.cancelCreate.emit(false);
  }

}
