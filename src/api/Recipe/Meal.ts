import { DocumentReference } from "firebase/firestore";
import { DMObject } from "../Topology/Abstracts";
import { RecipeUser } from "./Recipe";
import { MealData } from "./types";

export default class Meal extends DMObject {
    private name: string;
    private notes: string;
    private rating?: number;
    private prepTime?: number;
    private cookTime?: number;
    private factor: number;
    private meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    private recipeUserReference?: DocumentReference;
    private recipeUser?: RecipeUser;
    private timeEaten: Date;
    private timeRecorded: Date;

    constructor(dataJSON: MealData, docRef?: DocumentReference) {
        super(dataJSON, docRef);

        this.name = dataJSON.name;
        this.notes = dataJSON.notes;
        this.rating = dataJSON.rating;
        this.prepTime = dataJSON.prepTime;
        this.cookTime = dataJSON.cookTime;
        this.factor = dataJSON.factor;
        this.meal = dataJSON.meal;
        this.recipeUserReference = dataJSON.recipeUserReference;
        this.timeEaten = dataJSON.timeEaten.toDate();
        this.timeRecorded = dataJSON.timeRecorded.toDate();
        if (dataJSON.recipeUser) this.recipeUser = dataJSON.recipeUser;
    }
}
