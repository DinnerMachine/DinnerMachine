/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- User/User -

@file: api/User/User.ts
@author: Dallin Guisti
@description: User class and utilities.
@version: 1.0.0
@created 8/21/2022
@updated 8/22/2022

Copyright (c) 2022 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Imports
    a. Firebase
    b. Object Parents
    c. Types
    d. Necessary Classes
2. Constants
3. User Class
4. Generator Functions
*/

/* ----- 1. Imports ----- */
/* a. Firebase Imports */
import {
    addDoc,
    collection,
    doc,
    DocumentReference,
    getDoc,
    getDocs,
    query,
    QuerySnapshot,
    where,
} from "firebase/firestore";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { db, storage } from "../Firebase/init";

/* b. Object Parents */
import { DMObject } from "../Topology/Abstracts";
import { DataJSON } from "../Topology/types";

/* c. Type Imports */
import { MealData, RecipeUserData } from "../Recipe/types";
import {
    Action,
    ActionData,
    InitUserData,
    Profile,
    ProfileData,
    UserData,
} from "./types";

/* d. Necessary Classes */
import { PermResolver } from "../Permissions/Perm";
import Recipe, { RecipeUser } from "../Recipe/Recipe";
import Meal from "../Recipe/Meal";
import { MalformedUserError, UserDoesNotExistError } from "./errors";

/* ----- 2. Constants ----- */
const USER_COLLECTION = collection(db, "users");

/* ----- 3. User Class ----- */

/** User class that houses DinnerMachine user data. */
export default class User extends DMObject {
    /* Internal data variables */
    private UUID: string;
    private permResolver: PermResolver;
    private profile: Profile;
    private recipes: Recipe[];
    private actions: Action;
    private tokens: { [key: string]: string };
    private mealHistory: Meal[];

    /**
     * @param dataJSON DataJSON object to initialize User class with.
     * @param docRef DocumentReference to bind User class to.
     */
    constructor(dataJSON: UserData, docRef?: DocumentReference | null) {
        super(dataJSON, docRef); // Initialize super class.

        // --- Initialize internal data variables ---
        this.UUID = dataJSON.UUID;

        // Parse data from JSON into usable data.
        this.profile = this.parseProfile(dataJSON.profile);
        this.permResolver = new PermResolver(dataJSON.perms); // Store permissions in PermResolver object
        this.recipes = this.parseRecipes(dataJSON.recipes);
        this.actions = this.parseActions(dataJSON.actions);
        this.mealHistory = this.parseMealHistory(dataJSON.mealHistory);
        this.tokens = dataJSON.tokens;
    }

    /* ----- Data Parsing Functions -----
        Used to convert Firestore JSON
        Data into usable API data.
    */

    /**
     * @description Updates data type of birthday and profile picture
     *              to be more accessible.
     * @param profileData ProfileData object to parse.
     * @returns Parsed profile data.
     */
    private parseProfile(profileData: ProfileData): Profile {
        let profile: Profile = {
            email: profileData.email,
            name: profileData.name,
            username: profileData.username,
        };
        if (profileData.birthday) {
            profile.birthday = profileData.birthday.toDate();
        }
        if (profileData.profilePicturePath) {
            profile.profilePicturePath = profileData.profilePicturePath;
            profile.profilePictureReference = ref(
                storage,
                profileData.profilePicturePath
            );
        }
        return profile;
    }

    /**
     * @description Convert recipe JSONs into Recipe objects.
     * @param recipes Recipe[] array to parse out.
     * @returns Array of recipe objects.
     */
    private parseRecipes(recipes: RecipeUserData[]): RecipeUser[] {
        let recipeUsers: RecipeUser[] = [];
        for (let recipe of recipes) {
            recipeUsers.push(new RecipeUser(recipe));
        }
        return recipeUsers;
    }

    /**
     * @description Converts action Timestamps into Dates
     * @param actionData ActionData object to parse.
     * @returns Map of actions.
     */
    private parseActions(actionData: ActionData): Action {
        let actions: Action = {};
        for (const key in actionData) {
            actions[key] = actionData[key].toDate();
        }
        return actions;
    }

    /**
     * @description Converts meal history JSON into meal objects.
     * @param mealHistory Meal data to parse.
     * @returns Array of meal objects.
     */
    private parseMealHistory(mealHistory: MealData[]): Meal[] {
        let meals: Meal[] = [];
        for (let meal of mealHistory) {
            meals.push(new Meal(meal));
        }
        return meals;
    }

    private getProfilePictureReference(): StorageReference | null {
        if (this.profile.profilePictureReference) {
            return this.profile.profilePictureReference;
        } else {
            return null;
        }
    }

    public getName(): string {
        return this.profile.name;
    }

    public getUsername(): string {
        return this.profile.username;
    }

    public getEmail(): string {
        return this.profile.email;
    }

    public async getProfilePictureURL(): Promise<string | null> {
        if (this.getProfilePictureReference()) {
            return await getDownloadURL(this.getProfilePictureReference()!);
        } else {
            return null;
        }
    }
}

/* ----- 4. Generator Functions ----- */

/**
 * @description Generates a new User class with proper
 *              linking to GlobalRecipes.
 * @param dataJSON DataJSON object to initialize User class with.
 * @param docRef DocumentReference to bind User class to.
 * @returns User class initialized with dataJSON.
 */
export async function generateUser(
    dataJSON: UserData,
    docRef?: DocumentReference | null
): Promise<User> {
    // TODO: Implement GlobalRecipes linking.
    // Currently unsure the best way to access parseRecipes function.
    return new User(dataJSON, docRef);
}

/**
 * @description Generates a new User class from userID
 * @param userID User ID to generate User class from.
 * @returns User class initialized with userID.
 */
export async function getUserByID(userID: string): Promise<User> {
    let docRef = doc(USER_COLLECTION, userID);
    let userDoc = await getDoc(docRef);
    let userData = userDoc.data();
    if (!userData) {
        throw new UserDoesNotExistError(userID);
    }
    let userObj = await generateUser(<UserData>userData, docRef).catch(
        // TODO: Create custom error class.
        (err) => {
            console.log(userData);
            throw new MalformedUserError(err);
        }
    );
    return userObj;
}

export async function getUserByAuthID(authID: string): Promise<User> {
    let q = query(USER_COLLECTION, where("UUID", "==", authID));
    let querySnapshot = await getDocs(q);
    let userDoc = querySnapshot.docs[0];
    let userData = userDoc.data();
    let docRef = userDoc.ref;
    if (!userData) {
        throw new UserDoesNotExistError(authID);
    }
    let userObj = await generateUser(<UserData>userData, docRef).catch(
        // TODO: Create custom error class.
        (err) => {
            console.log(userData);
            throw new MalformedUserError(err);
        }
    );
    return userObj;
}

export async function registerUser(userData: InitUserData) {
    let data = {
        UUID: "",
        perms: {
            groups: [],
            permissions: [],
        },
        actions: {},
        recipes: [],
        mealHistory: [],
        tokens: {},
        ...userData,
    };
    let finalData = data as UserData;
    let docRef = await addDoc(USER_COLLECTION, finalData);
    let userObj = await generateUser(finalData, docRef);
    return userObj;
}
