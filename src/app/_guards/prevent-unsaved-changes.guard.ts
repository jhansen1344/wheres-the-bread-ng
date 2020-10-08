import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemEditComponent } from '../items/item-edit/item-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ItemEditComponent): boolean {
      if(component.editForm.dirty){
        return confirm('Are you sure you want to continue?  Any unsaved changes will be lost.');
      }
    return true;
  }
  
}
