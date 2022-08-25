/*
~ ~ ~ RecipeGen - Recipe Manager & Generator ~ ~ ~
- Firebase/init -

@file: api/Firebase/init.ts
@author: Dallin Guisti
@description: Firebase initialization scripts.
@version: 1.0.0
@created 8/21/2022
@updated 8/21/2022

Copyright (c) 2022 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Imports
    a. Firebase
*/

/* ----- 1. Imports ----- */
/* a. Firebase Imports */
import { FirebaseApp, initializeApp } from "firebase/app";
//import { Analytics, getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

// Exported variables {app, db, storage}
export var firebaseInitialized = false;
export var app: FirebaseApp;
//export var analytics: Analytics;
export var db: Firestore;
export var storage: FirebaseStorage;

function initFirebase() {
    // Define firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyBdVKzLSBtNb7yvWMEdkWGBBGJhR1Cf8D8",
        authDomain: "recipegenerate.firebaseapp.com",
        projectId: "recipegenerate",
        storageBucket: "recipegenerate.appspot.com",
        messagingSenderId: "876601430125",
        appId: "1:876601430125:web:e01b72753e2a3a67baef64",
        measurementId: "G-JP64MF3L9Z",
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    //analytics = getAnalytics(app);
    db = getFirestore();
    storage = getStorage();
    firebaseInitialized = true;
}

// If firebase is not initialized, initialize it.
if (!firebaseInitialized) {
    initFirebase();
}
