import { db } from '@api/Firebase/init';
import Category from '@api/Organization/Category/Category';
import { CategoryData } from '@api/Organization/types';
import Directions, { DirectionGroup } from '@api/Recipe/Direction/Directions';
import RecipeGlobal, { RecipeUtils } from '@api/Recipe/Recipe';
import { RecipeGlobalData, RecipeUserData } from '@api/Recipe/types';
import { ActionData, ProfileData, TokenData, UserData } from '@api/User/types';
import User from '@api/User/User';
import { doc } from 'firebase/firestore';

var dinnerData: CategoryData = {
    name: 'Dinner',
};
var dinnerCategory = new Category(dinnerData);

var actions: ActionData = {};
var permsData: PermsData = {};
var perms = new Perms(permsData);
var logData = {};
var logs = new Logs(logData);
var profile: ProfileData = {
    birthday: new Date('2006-10-11'),
    email: 'dallin@guisti.org',
    name: 'Dallin Guisti',
    profilePicture: 'https://avatars.githubusercontent.com/u/10191084?v=4',
    username: 'dguisti',
};
var recipeData: RecipeUserData[] = [];
var recipes = new Recipes(recipeData);
var tokens: TokenData = {};
var dallinData: UserData = {
    UUID: 'ijNkTn9YwQUawYHYQ2YQMqTpCYF2',
    actions: actions,
    perms: perms,
    logs: logs,
    profile: profile,
    recipes: recipes,
    tokens: tokens,
};
var dallin = new User(dallinData);

var directionGroups: DirectionGroup[] = [];
var directions = new Directions(directionGroups);

var ingredientData: IngredientData = {};
var ingredients = new Ingredients(ingredientData);

var reviewData: ReviewData = {};
var reviews = new Reviews(reviewData);

var tagData: TagData = {};
var tags = new Tags(tagData);

var sourceData: SourceData = {};
var sources = new Sources(sourceData);

var pizzaData: RecipeGlobalData = {
    attachments: [],
    author: "Mel's Kitchen Cafe",
    category: dinnerCategory,
    prepTime: 25,
    cookTime: 10,
    serves: 4,
    creator: dallin,
    description:
        'This simple recipe for quick and easy homemade pizza dough is amazing! It comes together in minutes, rises quickly, and makes incredible homemade pizza!',
    directions: directions,
    ingredients: ingredients,
    name: 'Quick and Foolproof Pizza Dough',
    reviews: reviews,
    tags: tags,
    thumbnail:
        'https://www.melskitchencafe.com/wp-content/uploads/2014/05/pizza.jpg',
    sources: sources,
    private: true,
};

var pizza = new RecipeGlobal(pizzaData);
