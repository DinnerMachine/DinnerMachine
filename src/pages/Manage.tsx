import { Button, Checkbox, ScrollArea, Table } from '@mantine/core';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { RecipeUser } from '../api/Recipe/Recipe';
import { getUserByID, registerUser } from '../api/User/User';
import RecipeTable from '../components/data/tables/RecipeTable';

var data = {
    profile: {
        name: 'Dallin Guisti',
        email: 'dallin@guisti.org',
        birthday: Timestamp.fromDate(new Date(2006, 9, 11)),
        username: 'dguisti',
    },
};

async function registerUserHandler() {
    let usr = await registerUser(data);
    console.log(usr);
}

function ManagePage() {
    var recipes: RecipeUser[] = [
        new RecipeUser({
            name: 'Recipe 1',
            description: 'This is recipe 1',
            lastDate: Timestamp.fromDate(new Date(2020, 1, 1)),
            rating: 5,
            familyRating: 3,
        }),
        new RecipeUser({
            name: 'Recipe 2',
            description: 'This is recipe 2',
            lastDate: Timestamp.fromDate(new Date(1920, 5, 8)),
            rating: 4,
            familyRating: 9,
        }),
    ];
    return (
        <div className="App" style={{ width: '80%', marginLeft: '10%' }}>
            <h1>Manage Recipes</h1>
            <br />

            <ScrollArea>
                <RecipeTable recipes={recipes} />
            </ScrollArea>
        </div>
    );
}

export default ManagePage;
