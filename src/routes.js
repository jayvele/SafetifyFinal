import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// import { Redirect } from 'react-router';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PersonalInfo from './pages/PersonalInfo';
import ViewInfo from './pages/ViewInfo';
import FindHospitals from './pages/FindHospitals';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/AuthContext';
import MedicalInfo from './pages/MedicalInfo';
import EmergencyContactsInfo from './pages/EmergencyContactsInfo';
import HospitalForm from './pages/HospitalFormPage';
import Reauth from './pages/Reauth';

// ----------------------------------------------------------------------

export default function Router() {
  const authCtx = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        authCtx.isLoggedIn && {
          path: 'personalInfo',
          element: <PersonalInfo />,
        },
        authCtx.isLoggedIn && {
          path: 'medicalInfo',
          element: <MedicalInfo />,
        },
        authCtx.isLoggedIn && {
          path: 'emergencyContacts',
          element: <EmergencyContactsInfo />,
        },
        authCtx.isLoggedIn && {
          path: 'viewInfo',
          element: <ViewInfo />,
        },
        authCtx.isLoggedIn && {
          path: 'findHospitals',
          element: <FindHospitals />,
        },
        authCtx.isLoggedIn && {
          path: 'reauth',
          element: <Reauth />,
        },
        authCtx.isLoggedIn && {
          path: 'hospitalForm',
          element: <HospitalForm />,
        },
        !authCtx.isLoggedIn && { path: '*', element: <Navigate to="/dashboard/app" /> },
      ],
    },

    {
      path: 'signUp',
      element: <SignUpPage />,
    },
    // {
    //   path: 'logout',
    //   element: <Logout />
    // },
    authCtx.isLoggedIn && {
      path: 'profile',
      element: <ProfilePage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
