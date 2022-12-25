import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth-service";
import { UserModel } from "../auth/user.model";
@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient,private recipeService: RecipeService,private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipies();
        this.http.put('https://project-e38f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',recipes).subscribe(
        response =>{
            console.log(response);
        }            
        );
    }
    fetchRecipes() {
          return this.http.get<Recipe[]>('https://project-e38f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json' 
          //   params: new HttpParams().set('auth',user.token)
          // }
          
        )
        .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingridients ? recipe.ingridients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
        );
      }

}