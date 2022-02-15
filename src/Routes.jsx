import { Navigate } from 'react-router-dom'

import TopView from './Pages/Top';
import LoginView from './Pages/Login';
import SignupView from './Pages/Signup';
import PasswordResetView from './Pages/PasswordReset';
import PasswordResetVerifyView from './Pages/PasswordResetVerify';
import EmailVerifyView from './Pages/EmailVerify';
import TermsView from './Pages/Terms';
import PrivacyView from './Pages/Privacy'

import Dashboard from './Layout/Dashboard';
import UserView from './Pages/User';
import AdvisorView from './Pages/Advisor';
import ProfileView from './Pages/Profile';
import ProfileUpdateView from './Pages/ProfileUpdate';
import ProfileEmailUpdateView from './Pages/ProfileEmailUpdate';
import ProfilePasswordUpdateView from './Pages/ProfilePasswordUpdate';

import NotFoundView from './Pages/NotFound';

var userData =  JSON.parse(localStorage.getItem("userData")) || null;

const routes = [
    {
        path: 'dashboard',
        element: userData? <Dashboard /> : <Navigate to ="/login" />,
        children: [
            { path: '', element: userData? <Navigate to="user" /> : <Navigate to="/login" /> },
            { path: 'user', element: userData? <UserView /> : <Navigate to="/login" /> },
            { path: 'advisor', element: userData? <AdvisorView /> : <Navigate to="/login" /> },
            // { path: 'profile', element: userData? <ProfileView /> : <Navigate to="/login" /> },
            // { path: 'profile/profile_update', element: userData? <ProfileUpdateView /> : <Navigate to="/login" /> },
            // { path: 'profile/change_email', element: userData? <ProfileEmailUpdateView /> : <Navigate to="/login" /> },
            // { path: 'profile/change_password', element: userData? <ProfilePasswordUpdateView /> : <Navigate to="/login" /> },
            // { path: 'inquiry', element: userData? <ProfileView /> : <Navigate to="/login" /> },
            { path: '*', element: <Navigate to="/404" />}
        ]
    },
    {
        path: '/',
        children: [
            { path: '', element: <TopView />},
            { path: 'login', element: <LoginView />},
            // { path: 'signup', element: <SignupView />},
            // { path: 'password_reset', element: <PasswordResetView />},
            // { path: 'password_reset/*', element: <PasswordResetVerifyView />},
            // { path: 'email_verify', element: <EmailVerifyView />},
            // { path: 'terms_service', element: <TermsView />},
            // { path: 'privacy_policy', element: <PrivacyView />},
            { path: '404', element: <NotFoundView /> }, 
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

export default routes;