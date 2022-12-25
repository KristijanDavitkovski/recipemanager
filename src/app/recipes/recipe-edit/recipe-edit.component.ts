import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  onSubmit(){
     const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
    this.recipeForm.value['imgPath'],this.recipeForm.value['ingridients']); 
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }
  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup(
        {
          'name': new FormControl(null,Validators.required),
          'ammount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        }
      )
    );
  }
  onDeleteIngridient(index: number){
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }
  private initForm(){
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imgPath;
      recipeDescription = recipe.description;
      if(recipe['ingridients']){
        for(let ingridient of recipe.ingridients){
          recipeIngridients.push(
            new FormGroup({
              'name': new FormControl(ingridient.name,Validators.required),
              'ammount': new FormControl(ingridient.ammount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imgPath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingridients' : recipeIngridients
    });
  }
  get controls() { 
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }


}
