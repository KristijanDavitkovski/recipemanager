import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingiridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  /*  private recipes: Recipe[] = [
        new Recipe("Kajgana","Jajca vo tavce","https://podravkaiovariations.azureedge.net/056270e2-6381-11eb-a05c-0242ac12005f/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",[new Ingiridient('Jajca',1)
        , new Ingiridient('Marula',2)]),
        new Recipe("Kajgana2","Jajca na oko","https://podravkaiovariations.azureedge.net/056270e2-6381-11eb-a05c-0242ac12005f/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1024x768-f2b21802-64bc-11eb-a115-0242ac130010.webp",[new Ingiridient('Jajca',3)
        , new Ingiridient('Marula',5)])
      ];  */
      
      private recipes: Recipe[] = [];
      constructor(private slService:ShoppingListService){}
      getRecipies(){
        return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];
      }
      addIngridientsToShoppingList(ingridients: Ingiridient[]){
        this.slService.addIngridients(ingridients);
      }
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

      }
      updateRecipe(index: number,newRecipe :Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(recipes);
      }
}