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
          element: <SignIn />
        },
        {
          path: "/auth/sign-up",
          element: <SignUp />
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
