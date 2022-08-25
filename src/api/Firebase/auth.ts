/*import {
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";*/

import {
    Auth,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    linkWithCredential,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    User,
    UserCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { app } from './init';

export type LoginData = {
    email: string;
    password: string;
    remember: boolean;
};

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function signedIn(
    callback: (user: User | null, redirect: boolean) => void,
): void {
    getRedirectResult(auth).then((userCredential) => {
        if (userCredential) {
            let user = userCredential.user;
            return callback(user, true);
        } else {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    return callback(user, false);
                } else {
                    return callback(user, false);
                }
            });
        }
    });
}

export function signInWithGoogle(
    data: LoginData,
    popup?: boolean,
): Promise<UserCredential> {
    if (popup) {
        return signInWithPopup(auth, provider);
    } else {
        return signInWithRedirect(auth, provider);
    }
}

export function login(data: LoginData) {
    var user: User;
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error);
        });
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
                const token = credential.accessToken;
            }

            // The signed-in user info.
            user = result.user;

            // ...
            console.log(user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
/*
const auth = getAuth(app);
export function login(data: LoginData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            updateProfile(user, {
                displayName: "Dallin Guisti",
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
*/
