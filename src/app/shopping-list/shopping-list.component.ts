import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingiridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private igChangedSub : Subscription;

  ingridients: Ingiridient[] = [
    new Ingiridient("jajce",3),
    new Ingiridient("marula",5)
  ];
  constructor(private slService: ShoppingListService) { }
  
  ngOnInit(): void {
    this.ingridients = this.slService.getIngredients();
    this.igChangedSub=  this.slService.ingridientsChanged
    .subscribe((ingridients:Ingiridient[]) =>{
      this.ingridients = ingridients
    }
    );
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);

  }
}
 

