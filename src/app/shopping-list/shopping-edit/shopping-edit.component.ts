import { Component,  EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingiridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static: false}) slForm: NgForm;
  subscription : Subscription;
  deletedItem : Ingiridient;
  editMode = false;
  editedItemIndex: number ;
  editedItem : Ingiridient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.
    subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          ammount: this.editedItem.ammount
        });
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingiridient(value.name,value.ammount);
    if(this.editMode){
      this.slService.updateIngridient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.onAddI(newIngredient);
    }
    this.editMode=false;
    form.reset();
    
  }
  onDelete(){
   this.slService.deleteIngridient(this.editedItemIndex);
   this.onClear();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
