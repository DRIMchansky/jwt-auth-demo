import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'

import { PrivateRoute } from './components/PrivateRoute/index.tsx'
import { RegisterPage } from './pages/Register/index.tsx'
import { ProfilePage } from './pages/Profile/index.tsx'
import { GlobalStyles } from './utils/styles/index.ts'
import { LoginPage } from './pages/Login/index.tsx'
import { HomePage } from './pages/Home/index.tsx'
import { store } from './store.ts'
import App from './App.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyles />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
