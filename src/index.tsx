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
import ProtectedRoute from './components/common/AuthorizedRedirectTo';

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
            <ProtectedRoute redirectTo="/home">
              <SignIn />
            </ProtectedRoute>
          )
        },
        {
          path: "/auth/sign-up",
          element: (
            <ProtectedRoute redirectTo="/home">
              <SignUp />
            </ProtectedRoute>
          )
        },
        {
          path: "/home",
          element: <p>sdfsdfsd</p>
        }
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
