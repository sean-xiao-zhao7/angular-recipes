import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm;
  sub: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.sub = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  clear() {
    this.slForm.reset();
    this.editMode = false;
  }

  delete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.editMode = false;
  }
}
