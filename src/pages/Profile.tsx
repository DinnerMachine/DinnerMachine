import { Container, LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signedIn, auth } from '../api/Firebase/auth';
import User, { getUserByAuthID, getUserByID } from '../api/User/User';

import { UserCardImage } from '../components/mantine/UserCardImage/UserCardImage';

function ProfilePage() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [image, setImage] = useState('');
    var [username, setUsername] = useState('');

    useEffect(() => {
        console.log('State updated');
        async function fetchUser() {
            let authUser = auth.currentUser;
            console.log('AuthUser', authUser);
            let uid = authUser?.uid;
            console.log('uid', uid);

            var user = await getUserByAuthID(uid!);
            console.log('user', user);

            setName(user.getName());
            setEmail(user.getEmail());
            let profilePictureUrl = authUser?.photoURL; // await user.getProfilePictureURL();
            if (profilePictureUrl) {
                setImage(profilePictureUrl);
            }
            setUsername(user.getUsername());
        }
        auth.onAuthStateChanged(fetchUser);
    }, []);

    return (
        <div className="App">
            <h1>Profile</h1>
            <Container size={350}>
                <UserCardImage
                    image="https://news-cdn.softpedia.com/images/news2/Google-Opens-Up-About-Its-Sci-Fi-Data-Centers-with-Art-Gallery-Worthy-Photos-5.jpg"
                    avatar={image}
                    name={name}
                    username={username}
                    stats={[{ label: 'Recipes', value: '0' }]}
                />
            </Container>
        </div>
    );
}

export default ProfilePage;
