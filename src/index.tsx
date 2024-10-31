import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { App } from './components/App';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux';
import store from "./store/store"
import { SignIn } from './components/Auth/SignIn';
import { SignUp } from './components/Auth/SignUp';
import { AuthorizedRedirectTo } from './components/common/AuthorizedRedirectTo';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Profile } from './components/User/Profile';
import { CourseCreate } from './components/Course/CourseCreate';
import { ProfileCourses } from './components/User/ProfileCourses';
import { ProfileUpdate } from './components/User/ProfileUpdate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/auth/sign-in",
          element: (
            <AuthorizedRedirectTo redirectTo="/profile">
              <SignIn />
            </AuthorizedRedirectTo>
          )
        },
        {
          path: "/auth/sign-up",
          element: (
            <AuthorizedRedirectTo redirectTo="/profile">
              <SignUp />
            </AuthorizedRedirectTo>
          )
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute redirectTo='/auth/sign-in'>
              <Profile />
            </ProtectedRoute>
          ),
          children: [
            {
              element: <ProfileCourses />,
              path: "/profile/courses"
            },
            {
              element: <ProfileUpdate />,
              path: "/profile/update"
            }
          ]
        },
        {
          path: "/profile/:userId",
          element: <Profile />,
          children: [
            {
              element: <ProfileCourses />,
              path: "/profile/:userId/courses"
            },
          ]
        },
        {
          path: "/courses/create",
          element: (
            <ProtectedRoute redirectTo='/auth/sign-in'>
              <CourseCreate />
            </ProtectedRoute>
          )
        },
      ]
    }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
