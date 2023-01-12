import { db, storage } from '@api/Firebase/init';
import Category from '@api/Organization/Category/Category';
import { CategoryDataReference } from '@api/Organization/Category/types';
import { Tags } from '@api/Organization/Tags/Tag';
import { TagsDataReference } from '@api/Organization/Tags/types';
import { PermsDataReference } from '@api/Permissions/types';
import Directions, { DirectionGroup } from '@api/Recipe/Direction/Directions';
import { Ingredients } from '@api/Recipe/Ingredient/Ingredient';
import { IngredientsDataReference } from '@api/Recipe/Ingredient/types';
import { Logs } from '@api/Recipe/Log/Log';
import { LogsDataReference } from '@api/Recipe/Log/types';
import RecipeGlobal, { Recipes } from '@api/Recipe/Recipe';
import { ReviewsDataReference } from '@api/Recipe/Review/types';
import { Sources } from '@api/Recipe/Source/Source';
import { SourcesDataReference } from '@api/Recipe/Source/types';
import {
    RecipeGlobalData,
    RecipeGlobalDataReference,
    RecipesDataReference,
} from '@api/Recipe/types';
import { ActionsDataReference } from '@api/User/Action/types';
import {
    ActionData,
    ProfileDataReference,
    TokenData,
    TokenDataReference,
    UserData,
    UserDataReference,
} from '@api/User/types';
import User from '@api/User/User';
import { collection } from 'firebase/firestore';
import { ref } from 'firebase/storage';

var dinnerData: CategoryDataReference = {
    name: 'Dinner',
};
var dinnerCategory = new Category(dinnerData);

var actions: ActionsDataReference = {
    actions: [],
};
var permsData: PermsDataReference = {};
var perms = new Perms(permsData);
var logs = collection(db, 'users/dguisti/Logs');
var profile: ProfileDataReference = {
    birthday: new Date('2006-10-11'),
    email: 'dallin@guisti.org',
    name: 'Dallin Guisti',
    profilePicture: ref(storage, 'users/dguisti/profilePicture'),
    username: 'dguisti',
};
var recipes = collection(db, 'users/dguisti/recipes');
var tokens: TokenDataReference[] = [];
var dallinData: UserDataReference = {
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

var ingredientData: IngredientsDataReference = {
    ingredients: [],
};
var ingredients = new Ingredients(ingredientData);

var reviewData: ReviewsDataReference = {};
var reviews = new Reviews(reviewData);

var tagData: TagsDataReference = {
    tags: [],
};
var tags = new Tags(tagData);

var sourceData: SourcesDataReference = {
    sources: [],
};
var sources = new Sources(sourceData);

var pizzaData: RecipeGlobalDataReference = {
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
