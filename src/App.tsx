import { useState } from 'react';
import HomePage from './pages/Home';
import ManagePage from './pages/Manage';
import LoginPage from './pages/Login';
import './scss/main.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import ProfilePage from './pages/Profile';
import { signedIn } from './api/Firebase/auth';
import { User } from 'firebase/auth';
import React from 'react';
import { HeaderAction } from './components/mantine/HeaderAction/HeaderAction';
import { MantineProvider } from '@mantine/core';
import DMTheme from './theme/theme';
import RegisterPage from './pages/Register';

export const AuthContext = React.createContext<{ user: null }>({ user: null });

function App() {
    const [count, setCount] = useState(0);

    const links = [
        {
            link: '/register',
            label: 'Sign Up',
        },
        {
            link: '/login',
            label: 'Sign In',
        },
        {
            link: '/profile',
            label: 'Profile',
        },
        {
            link: '/manage',
            label: 'Manage Recipes',
        },
    ];
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={DMTheme}>
            <HeaderAction links={links}></HeaderAction>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="manage"
                    element={
                        <RequireAuth>
                            <ManagePage />
                        </RequireAuth>
                    }
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="reset-password" element={<LoginPage />} />
                <Route path="welcome" element={<HomePage />} />
                <Route
                    path="profile"
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </MantineProvider>
    );
}

function RequireAuth({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const navigate = useNavigate();

    var signedInCallback = (user: User | null, redirect: boolean) => {
        if (!user) {
            navigate('/login', { state: { from: location }, replace: true });
        }
        //return <Navigate to="/login" state={{ from: location }} replace />;
    };

    signedIn(signedInCallback);

    return children;
}

export default App;
