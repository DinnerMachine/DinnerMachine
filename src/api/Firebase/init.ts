/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
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
import { FirebaseApp, initializeApp } from 'firebase/app';
//import { Analytics, getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

// Exported variables {app, db, storage}
export var firebaseInitialized = false;
export var app: FirebaseApp;
//export var analytics: Analytics;
export var db: Firestore;
export var storage: FirebaseStorage;

function initFirebase() {
    // Define firebase config
    const firebaseConfig = {
        apiKey: 'AIzaSyAl-Yig17gfO2Zj3PdlYi0B4N4R-j_x_D0',
        authDomain: 'dinner-machine.firebaseapp.com',
        projectId: 'dinner-machine',
        storageBucket: 'dinner-machine.appspot.com',
        messagingSenderId: '499180484804',
        appId: '1:499180484804:web:601ab8e25cbbd98f71b191',
        measurementId: 'G-Y8BXCP73ZC',
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
