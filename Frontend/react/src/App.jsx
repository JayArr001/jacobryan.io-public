import { useState, useEffect, useLayoutEffect } from 'react'
import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import GuestbookPage from './pages/GuestbookPage';
import ResumePage from './pages/ResumePage';
import BlogRoutes from './routes/BlogRoutes';
import ForbbidenPage from './pages/ForbbidenPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const ScrollWrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      //Scroll to the top of the page when the route changes
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    return children;
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path = '/' element={
          <ScrollWrapper>
            <MainLayout/>
          </ScrollWrapper>
        } errorElement= {<ErrorPage/>}>
          <Route index element={<MainPage />}/>
          <Route path='/guestbook' element={<GuestbookPage/>}/>
          <Route path="/blog/*" element={<BlogRoutes/>} />
          <Route path='/about' element={<ResumePage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='*' element={<NotFoundPage />}/>
          <Route path='/forbidden' element={<ForbbidenPage/>}/>
          <Route path='/privacy' element={<PrivacyPolicyPage/>}/>
        </Route>
    )
  );


  return (
    <>
      <RouterProvider router={router}/>
    </>
  );

}

export default App
