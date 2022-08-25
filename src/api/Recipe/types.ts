import { DocumentReference, Timestamp } from "firebase/firestore";
import User from "../User/User";
import Directions from "./Directions";
import Ingredient from "./Ingredient";
import { RecipeUser } from "./Recipe";
import Review from "./Review";

export type RecipeGlobalData = {
    attachments: string[];
    author?: string;
    category: string;
    prepTime?: number;
    cookTime?: number;
    serves?: number;
    creatorReference: DocumentReference;
    creator?: User;
    description: string;
    directions: Directions;
    ingredients: Ingredient[];
    name: string;
    reviews: Review[];
    tags: string[];
    thumbnailPath?: string;
    sourceUrls: string[];
    private: boolean;
};

export type RecipeUserData = {
    name: string;
    recipeGlobalReference: DocumentReference;
    lastDate?: Timestamp;
    rating?: number;
    familyRating?: number;
    type: "RecipeUser";
};

export type MealData = {
    name: string;
    notes: string;
    rating?: number;
    prepTime?: number;
    cookTime?: number;
    factor: number;
    meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    recipeUserReference?: DocumentReference;
    recipeUser?: RecipeUser;
    timeEaten: Timestamp;
    timeRecorded: Timestamp;

    type: "Meal";
};
