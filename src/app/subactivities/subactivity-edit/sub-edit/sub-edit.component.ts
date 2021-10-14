import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
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
  styleUrls: ['./sub-edit.component.css'],
})
export class SubEditComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  @ViewChild('editForm')editForm: NgForm;
  sub: SubActivityDetail;
  validationErrors: string[] = [];
  itemsData: Item[] = [];
  availableItems: Item[] = [];
  form: FormGroup;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  get itemsFormArray() {
    return this.form.controls.items as FormArray;
  }

  constructor(
    private subService: SubService,
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSub();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      items: new FormArray([]),
    });
  }

  private addCheckboxes() {
    this.itemsData.forEach((item) =>
      this.itemsFormArray.push(new FormControl(false))
    );
  }

  loadSub() {
    this.subService
      .getSub(this.route.snapshot.paramMap.get('id'))
      .subscribe((sub) => {
        this.sub = sub;
        this.itemService.getItems().subscribe((items) => {
          this.itemsData = items;
          this.itemsData.forEach((item) => {
            if (
              this.sub.items.findIndex((subItem) => subItem.id === item.id) !==
              -1
            ) {
              this.itemsFormArray.push(new FormControl(true));
            } else {
              this.itemsFormArray.push(new FormControl(false));
            }
          });
        });
      });
  }

  updateItem() {
    const selectedItemIds = this.form.value.items
      .map((checked, i) => (checked ? this.itemsData[i].id : null))
      .filter((v) => v !== null);

    let subToUpdate = {
      id: this.sub.id,
      name: this.sub.name,
      itemIds: selectedItemIds,
    };
    this.subService.updateSub(subToUpdate).subscribe(() => {
      this.toastr.success('Activity Updated Successfully');
      this.form.reset(this.sub);
    });
  }

  cancel() {
    this.cancelEdit.emit(false);
  }
}
