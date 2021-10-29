import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number) {
    return this.ingredients[i];
  }

  updateIngredient(i: number, ingredient: Ingredient) {
    this.ingredients[i] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
