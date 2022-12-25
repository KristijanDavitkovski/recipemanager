import { Injectable } from "@angular/core";
import { Ingiridient } from "../shared/ingridient.model";
import { Subject } from "rxjs";
@Injectable()
export class ShoppingListService {
    ingridientsChanged = new Subject<Ingiridient[]>();
    startedEditing = new Subject<number>();
   private ingridients: Ingiridient[] = [
        new Ingiridient("jajce",3),
        new Ingiridient("marula",5)
      ];
    
      onAddI(ingr:Ingiridient){
        this.ingridients.push(ingr);
        this.ingridientsChanged.next(this.ingridients.slice());
      }
      getIngredient(index: number){
        return this.ingridients[index];
      }
      getIngredients(){
        return this.ingridients.slice();
      }
      deleteIngridient(index:number){
        this.ingridients.splice(index,1);
        this.ingridientsChanged.next(this.ingridients.slice());
      }
      updateIngridient(index: number, newIngredient: Ingiridient){
        this.ingridients[index] = newIngredient;
        this.ingridientsChanged.next(this.ingridients.slice());
      }
      ngOnInit(): void {
      }
      addIngridients(ingridients: Ingiridient[]){
        /* for(let ingridient of ingridients){
            this.addIngridients(ingridient);
        } */
        this.ingridients.push(...ingridients);
        this.ingridientsChanged.next(this.ingridients.slice());
      }
    
}